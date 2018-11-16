/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
require('@babel/polyfill');
const filepath = require('filepath');
const fm = require('front-matter');
const fs = require('fs-extra');
const glob = require('glob-promise');
const rimraf = require('rimraf');
const shell = require('shelljs');

const CWD = process.cwd();

const utils = require('../server/utils');

const siteConfig = require(`${CWD}/website/siteConfig.js`);
const buildDir = `${CWD}/website/build`;
const docsDir = `${CWD}/docs`;
const staticCSSDir = `${CWD}/website/static/css`;

let inputMarkdownFiles = [];
let inputAssetsFiles = [];
let outputHTMLFiles = [];
let outputAssetsFiles = [];

function generateSite() {
  shell.cd('website');
  shell.exec('yarn build', {silent: true});
}

function clearBuildFolder() {
  return rimraf(buildDir);
}

describe('Build files', () => {
  beforeEach(() => {
    shell.cd(CWD);
  });

  beforeAll(() => {
    generateSite();
    return Promise.all([
      glob(`${docsDir}/**/*.md`),
      glob(`${buildDir}/${siteConfig.projectName}/docs/**/*.html`),
      glob(`${docsDir}/assets/*`),
      glob(`${buildDir}/${siteConfig.projectName}/img/*`),
    ]).then(results => {
      [
        inputMarkdownFiles,
        outputHTMLFiles,
        inputAssetsFiles,
        outputAssetsFiles,
      ] = results;
    });
  });

  afterAll(() => {
    clearBuildFolder();
  });

  test('Build folder exists', () =>
    fs.stat(buildDir).then(status => {
      expect(status.isDirectory()).toBeTruthy();
    }));

  test('Generated HTML for each Markdown resource', () => {
    const metadata = outputHTMLFiles.map(file =>
      filepath.create(file).basename(),
    );
    inputMarkdownFiles.forEach(file => {
      const data = fs.readFileSync(file, 'utf8');
      const frontmatter = fm(data);
      expect(metadata).toContain(`${frontmatter.attributes.id}.html`);
    });
  });

  test('Generated table of contents', () => {
    outputHTMLFiles.forEach(file => {
      const fileContents = fs.readFileSync(file, 'utf8');
      expect(fileContents).not.toContain('<AUTOGENERATED_TABLE_OF_CONTENTS>');
    });
  });

  test('Concatenated CSS files', async () => {
    const inputFiles = await glob(`${staticCSSDir}/*.css`);
    const combinedCSSFile = `${buildDir}/${
      siteConfig.projectName
    }/css/main.css`;
    const fileContents = await Promise.all(
      [combinedCSSFile, ...inputFiles].map(file => fs.readFile(file, 'utf8')),
    );

    const [outputFileContent, ...inputFileContents] = fileContents;
    const minifiedCssFiles = await Promise.all(
      inputFileContents.map(utils.minifyCss),
    );

    minifiedCssFiles.forEach(fileContent => {
      expect(outputFileContent).toContain(fileContent);
    });
  });

  test('Copied assets from /docs/assets', () => {
    const metadata = outputAssetsFiles.map(file =>
      filepath.create(file).basename(),
    );
    inputAssetsFiles.forEach(file => {
      const path = filepath.create(file);
      expect(metadata).toContain(path.basename());
    });
  });
});
