---
id: Document
title: Document
---  
#### Compression
GcPdf allows you to compress or reduce the original file size of the document using CompressionLevel property. The compression level ranges from 0 to 9, where 0 indicates no compression and 9 indicates the best compression. By default, value of compression level is set to 6.

#### Document Info
GcPdf contains DocumentInfo property which includes basic information about the document such as title, author, subject etc., that helps in its identification. This data is generated automatically, if not set explicitly.

#### Font Embedding
GcPdf allows you to set the mode of font embedding using FontEmbedMode property. By default, font subsets are embedded in a document. However, you can change this property to embed whole fonts or not to embed fonts.
#### Metadata
GcPdf provides Metadata property which allows you to get the metadata associated with the document. Metadata such as keywords, descriptions are used by the search engines to narrow down the searches. This property provides a number of predefined accessors, such as contributors, creators, copyright, description, etc.
#### Actions
GcPdf contains OpenAction method which provides a value specifying an action that should be performed when a document is opened.
#### Pdf Version
GcPdf allows you to set the PDF version of the selected document using PdfVersion property. Although, the version of the document is determined automatically but it can be set explicitly.
#### Viewer Preferences Type
GcPdf provides ViewerPreferences property to specify how a document should be displayed on opening in a viewer. This property allows you to set the predominant reading order for text, set the number of copies to be printed when the print dialog is opened for this file, and more preferences.

## Get Document Properties
To get the document properties from a particular PDF document:

1. Create an object of GcPdfDocument class.
2. Load any existing PDF file using the Load method.
3. Use the GcPdfDocument object to get the document properties of the PDF file.

```
   C#  
   static void Main(string[] args)  
   {  
      // Load an existing PDF using FileStream  
       FileStream fileStream = File.OpenRead(args[0].ToString());  
       GcPdfDocument doc = new GcPdfDocument();  
       doc.Load(fileStream, null);  
       // Get and Display the property values  
       Console.WriteLine("Author of the document is {0}", doc.DocumentInfo.Author);  
       Console.WriteLine("Document subject is {0}", doc.DocumentInfo.Subject);  
       Console.WriteLine("Documentation title {0}", doc.DocumentInfo.Title);  
   }  
```
