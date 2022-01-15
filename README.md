# GSheets_JS_Data_Layout_Transform

This script can be use in Google Workspace on Google Apps Script and is written with JavaScript.

**Script transform the data from layout:**
- supplier | product_code | 1st dimension of 1st package | 2nd dimension of 1st package | 3rd dimension of 1st package | wage of 1st package | 1st dimension of 2nd package | 2nd dimension of 2nd package | 3rd dimension of 2nd package | wage of 2nd package | etc.

**To:**
- supplier | product_code | 1st dimension of 1st package | 2st dimension of 1st package | 3st dimension of 1st package | wage of 1st package
- supplier | product_code | 1st dimension of 2nd package | 2nd dimension of 2nd package | 3rd dimension of 2nd package | wage of 2nd package
etc.

Next **sort package dimensions** from the highest to the lowest value (desc) and at the end **return transformed & sorted data to file**.
