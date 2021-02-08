//Не безопасно 
export default (req, res) => {
    res.setPreviewData({});
    res.end('Preview Mode enable');
}