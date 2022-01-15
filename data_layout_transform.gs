/*
    Google Sheets Data Layout Changer
    Describe: Script which download data from file, change layout in table with logistics data and return transformed array to file.
    Author: Tomasz Łabędzki

    Script structure:
    1. Main function with settings.
    2. Function that transform layout of data.
    3. Function which sort package dimensions from the highest to the lowest value (desc).
    4. Function that return transformed and sorted data to file.
*/

function data_layout_changer_run() {

  /* Settings: file & sheets adresses + other settings */

  file_with_data = "1j2Z0dcQ9LaINjCBhJtnCWx7uqiP923N9YriE4Q_lZyM"

  source_sheet_name = 'data_to_change'
  target_sheet_name = 'changed_data'

  target_start_row = 2
  target_start_col = 1

  transformed_data = data_transformation(file_with_data, source_sheet_name, target_sheet_name);
  sorted_data = data_sort(transformed_data);
  return_result_to_file(sorted_data, file_with_data, target_start_row, target_start_col);

}

function data_transformation(file_with_data, source_sheet_name, target_sheet_name) {

  Logger.log('Connecting to file.')
  ss = SpreadsheetApp.openById(file_with_data);
  source_sheet = ss.getSheetByName(source_sheet_name);

  Logger.log('Connected, starting downloading the data.')
  data_to_transform = source_sheet.getDataRange().getValues();
  columns_qty = source_sheet.getDataRange().getLastColumn();
  
  transformed_data_line = []
  transformed_data_array = []
  
  Logger.log('Data downloaded, transforming the data.')
  for(a = 0; a < data_to_transform.length; a++){
  if(a > 0){
    for (var b = 2; b <= columns_qty; b = b+4){
      if (data_to_transform[a][b] != "" && data_to_transform[a][b] != null){

        transformed_data_line.push(
          data_to_transform[a][0],
          data_to_transform[a][1],
          data_to_transform[a][b],
          data_to_transform[a][b+1],
          data_to_transform[a][b+2],
          data_to_transform[a][b+3]
        );

        Logger.log("Line added: " + transformed_data_line);
        transformed_data_array.push(transformed_data_line);
          
        transformed_data_line = []
        }
      }
    }
  }

  Logger.log('Data transformed.')
  return transformed_data_array

}

function data_sort(transformed_data) {

  data = transformed_data;

  sorted_data = []
  sorted_array = []

  for (row = 1; row < data.length; row++){

    to_sort = []

    to_sort.push(data[row][2])
    to_sort.push(data[row][3])
    to_sort.push(data[row][4])
    to_sort.sort(sortNum)

    sorted_data.push([data[row][0], data[row][1], to_sort[0], to_sort[1], to_sort[2], data[row][5]])

  }

  Logger.log('Data sorted.')
  return sorted_data

}

function return_result_to_file(data_to_return, file_with_data, target_start_row){

  Logger.log('Connecting to target file.')
  ss = SpreadsheetApp.openById(file_with_data);
  where_to_add_data = ss.getSheetByName(target_sheet_name);

  rows_in_target_range = where_to_add_data.getDataRange().getLastRow();
  columns_in_target_range = where_to_add_data.getDataRange().getNumColumns();

  data_to_return_rows_qty = data_to_return.length;
  data_to_return_columns_qty = data_to_return[0].length;

  Logger.log('Connected, starting clear target range & paste the data.')
  clear_range = where_to_add_data.getRange(target_start_row, target_start_col, rows_in_target_range, columns_in_target_range)
  paste_new_data_to_wynik = where_to_add_data.getRange(target_start_row, target_start_col, data_to_return_rows_qty, data_to_return_columns_qty).setValues(data_to_return);
  Logger.log('Data pasted, all done.')

}

function sortNum(a, b){
  return b - a;
}
