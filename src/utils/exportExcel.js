import moment from 'moment'
function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
}


function exportToExcel(columns, data, fileName) {
    let downloadEl = document.createElement('a')
    let str = '<tr><td>';
    let str2 = ''
    columns.forEach((item, index) => {
        if (item.type === 'expand' || !item.key) 
            return
        if (index === columns.length - 1) {
            str += `${item.title}</td></tr>`;
        } else {
            str += `${item.title}</td><td>`;
        }
    });
    data.forEach((item) => {
        str += '<tr>';
        columns.forEach((column) => {
            // 处理时间戳格式数据
            if (column.key) {
                const value = (/[d|D]ate|[t|T]ime/.test(column.key) && typeof item[column.key] === 'number') ?
                    moment(item[column.key]).format('YYYY-MM-DD hh:mm:ss') : item[column.key];
                str += `<td>${`${value || ''}\t`}</td>`;
            }
        });
        str += '</tr>';
    });
    // Worksheet名字
    const worksheet = 'Sheet1';
    const uri = 'data:application/vnd.ms-excel;base64,';
    // 表格模板数据
    const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${worksheet}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body><table>${str}</table></body></html>`;

    downloadEl.href = uri + base64(template);
    // 补后缀
    const name = fileName.split('.')[1] ? fileName : `${fileName}.xls`;
    downloadEl.download = name;
    downloadEl.click();
}


export default exportToExcel;