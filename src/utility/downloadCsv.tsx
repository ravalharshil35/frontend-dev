
function downloadCsv(param: any) {
    const data = param.data;

    if (!Array.isArray(data) || data.length === 0) {
        console.error('No data to export');
        return;
    }

    // Place the entire string in the first cell only (quoted to avoid splitting by commas)
    const customHeader = `"FORMAT STUDENT IMPORT, STANDARD 1.0, DEFINITION $DEFAULT"`;

    const csvHeaders = Object.keys(data[0]).join(',');
    const csvRows = data.map(row => Object.values(row).join(',')).join('\n');
    const csvData = `${customHeader}\n${csvHeaders}\n${csvRows}`;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const date = new Date();
    const fileName = `${param.fileName}_${date.toLocaleDateString('en-GB').replace(/\//g, '.')}_${date.getTime()}.csv`;

    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', fileName);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}

export default downloadCsv