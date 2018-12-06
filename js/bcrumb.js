function retrieveHeadersList(curNode){
  var list = [];
  var temp = curNode.querySelector('a').innerText;
  list.push(temp);
  curNode = curNode.parentNode;
  while(curNode && curNode.tagName != 'SECTION'){
    if(Array.prototype.indexOf.call(curNode.classList, 'navGroup') > -1){
      let cName = '.navGroupCategoryTitle';
      if(Array.prototype.indexOf.call(curNode.classList, 'subNavGroup') > -1){
        cName = '.navGroupSubcategoryTitle';
      }
      var header = fetchHeader(curNode, cName);
      if(header){
        list.push(header);
      }
    }
    curNode = curNode.parentNode;
  }

  return list.reverse();
}

function fetchHeader(curNode, cName){
  var cat = curNode.querySelector(cName);
  return cat? cat.innerText : null;
}

function createBreadCrumb(cInfo){
  var cRoot = document.createElement('div');
  cRoot.classList.add('crumb-root');

  for(var i = 0; i < cInfo.length; i++){
    var node;
    if(i != 0){
      node = document.createElement('span');
      node.innerText = '>>';
      node.classList.add('c-node');
      node.classList.add('c-separator');
      cRoot.appendChild(node);
    }

    node = document.createElement('span');
    node.innerText = cInfo[i];
    node.classList.add('c-node');
    node.classList.add('c-text');
    cRoot.appendChild(node);
  }

  return cRoot;
}

document.addEventListener('DOMContentLoaded', function() {
    var activeItem = document.querySelector('li.navListItemActive');
    if(!activeItem){
      return;
    }
    var bCrumbData = retrieveHeadersList(activeItem);
    var cRoot = createBreadCrumb(bCrumbData);
    var mainWrapper = document.querySelector('.navPusher');
    if(mainWrapper){
      mainWrapper.insertBefore(cRoot, mainWrapper.firstChild);
    }
  });