import dateParser from '../functions/DateParser';
import Global from '../pages/global';

export default function templateMail(payment_id, title, client_name, clients, price, date_start, date_end, time)
{

    return `<table class="4d8590db0c504bafnl-container" bgcolor="#fff" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fff;border-collapse:collapse;border-spacing:0;line-height:inherit;min-width:320px;table-layout:fixed;vertical-align:top;width:100%">
   <tbody style="line-height:inherit"><tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
       <td valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top;word-break:break-word">  
           <div style="background-color:transparent;line-height:inherit"> 
               <div class="84254d73117b9d63block-grid" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word"> 
                   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
                       <div class="66921356b8921501col 69217c56783e4118num12" style="display:table-cell;line-height:inherit;max-width:650px;min-width:320px;vertical-align:top;width:650px">
                           <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
                               <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
                                   <table class="3bb00f1abf602ceadivider" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;min-width:100%;table-layout:fixed;vertical-align:top">
                                       <tbody style="line-height:inherit">
                                           <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                                               <td class="6fd22eac301d21f1divider_inner" valign="top" style="border-collapse:collapse;line-height:inherit;min-width:100%;padding:10px;vertical-align:top;word-break:break-word">
                                                   <table class="cc5372ca4c47819cdivider_content" align="center" border="0" cellpadding="0" cellspacing="0" height="10" width="100%" style="border-collapse:collapse;border-spacing:0;border-top-color:transparent;border-top-style:solid;border-top-width:0px;height:10px;line-height:inherit;table-layout:fixed;vertical-align:top;width:100%">
                                                       <tbody style="line-height:inherit">
                                                           <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                                                               <td height="10" valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top;word-break:break-word">
                                                                   <span style="line-height:inherit"></span>
                                                               </td>
                                                           </tr>
                                                       </tbody>
                                                   </table> 
                                               </td>
                                           </tr>
                                       </tbody>
                                   </table>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       <div style="background-color:transparent;line-height:inherit"> 
           <div class="84254d73117b9d63block-grid" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
               <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
                   <div class="66921356b8921501col 69217c56783e4118num12" style="display:table-cell;line-height:inherit;max-width:650px;min-width:320px;vertical-align:top;width:650px">
                       <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
                           <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
                               <div class="75c33ad8c9900aa6img-container b1cf16866dc48ab2center 3cf37c6771c0fd8aautowidth" align="center" style="line-height:inherit;padding-left:0px;padding-right:0px">
                                   <a href="${Global.url}" target="_blank" style="line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,U5n8isyC6MzdHWTSrW3JpQ&amp;l=aHR0cDovL2xvY2FsaG9zdDozMDAwLw" data-orig-href="http://localhost:3000/" class="daria-goto-anchor" rel="noopener noreferrer">
                                       <img class="b1cf16866dc48ab2center 3cf37c6771c0fd8aautowidth" align="center" border="0" width="136" style="border:0;display:block;height:auto;line-height:inherit;max-width:136px;text-decoration:none;width:100%" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2IiBoZWlnaHQ9IjExOSIgdmlld0JveD0iMCAwIDEzNiAxMTkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNjggMTAuMDAwMUgzMi4zNzA3TDYgNDMuNzIxNEw2OCAxMTIuNUwxMzAgNDMuNzIxNEwxMDMuNTQ3IDEwLjAwMDFINjhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPg0KPHBhdGggZD0iTTY4IDEzLjUwMDFIMzUuMjQ0TDExIDQzLjQ4ODJMNjggMTA3LjVMMTI1IDQzLjQ4ODJMMTAwLjY4IDEzLjUwMDFINjhaIiBzdHJva2U9IiNFRUY3RkUiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+DQo8cGF0aCBkPSJNMzguNjI5IDU2LjgwMjVMMzguNzg4IDU1Ljk1NDVMNDMuMjkzIDUzLjc4MTVMNDguMzgxIDI0Ljg0MzVMNDQuNjE4IDIyLjY3MDVMNDQuNzc3IDIxLjgyMjVINzAuNTg4TDY4Ljk0NSAzMC45OTE1SDY4LjE1TDY1LjgxOCAyNC41Nzg1SDU0LjlMNTIuNjIxIDM3LjQ1NzVINjAuMkw2My44NTcgMzIuODk5NUg2NC43MDVMNjIuNjM4IDQ0LjUwNjVINjEuNzlMNTkuNzc2IDQwLjAwMTVINTIuMTQ0TDQ5LjY1MyA1NC4wNDY1SDYyLjMyTDY3LjI0OSA0Ni4zMDg1SDY4LjA5N0w2Ni4yNDIgNTYuODAyNUgzOC42MjlaIiBmaWxsPSJ3aGl0ZSIvPg0KPHBhdGggZD0iTTY2LjYyOSA2OS41MDAxTDY2Ljc4OCA2OC42NTIxTDcxLjI5MyA2Ni40NzkxTDc2LjM4MSAzNy41NDExTDcyLjYxOCAzNS4zNjgxTDcyLjc3NyAzNC41MjAxSDg3Ljk4OEw4Ny44MjkgMzUuMzY4MUw4Mi44NDcgMzcuNTQxMUw3Ny43MDYgNjYuNzQ0MUg4OC40NjVMOTQuMDgzIDU3LjIwNDFIOTQuOTMxTDkyLjcwNSA2OS41MDAxSDY2LjYyOVoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNNDYuNDQxNCA4MC45NzkySDkwLjE2MDYiIHN0cm9rZT0iI0VFRjdGRSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4NCjxwYXRoIGQ9Ik05OC4yMzQxIDQxLjAyNzhDMTAwLjI5NSA0MS4wMjc4IDEwMS45NjYgMzkuMzUyIDEwMS45NjYgMzcuMjg0N0MxMDEuOTY2IDM1LjIxNzUgMTAwLjI5NSAzMy41NDE3IDk4LjIzNDEgMzMuNTQxN0M5Ni4xNzI5IDMzLjU0MTcgOTQuNTAyIDM1LjIxNzUgOTQuNTAyIDM3LjI4NDdDOTQuNTAyIDM5LjM1MiA5Ni4xNzI5IDQxLjAyNzggOTguMjM0MSA0MS4wMjc4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz4NCjwvc3ZnPg0K">
                                   </a>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   <div style="background-color:transparent;line-height:inherit"> 
       <div class="84254d73117b9d63block-grid" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
           <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
               <div class="66921356b8921501col 69217c56783e4118num12" style="display:table-cell;line-height:inherit;max-width:650px;min-width:320px;vertical-align:top;width:650px">
                   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
                       <div style="border:0px solid transparent;line-height:inherit;padding:25px 25px 15px 25px">
                           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                               <tbody>
                                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:center">
                                               <span style="color:#ffffff;line-height:inherit">Заказ: 
                                                   <span class="wmi-callto">№${payment_id}</span>
                                               </span>
                                           </h1>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   </div>
   <div style="background-color:transparent;line-height:inherit">
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
       <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
           <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
               <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
                   <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
                       <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                           <tbody>
                               <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                                   <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                                       <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:24px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                                           <span style="color:#ffffff;line-height:inherit">Имя заказчика:&nbsp;</span>
                                       </h1>
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
       <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
           <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
               <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                       <tbody>
                           <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                               <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                                   <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                                       <span style="color:#ffffff;line-height:inherit">${client_name}</span>
                                   </h1>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </div>
           </div>
       </div>
   </div>
   </div>
   </div> 
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
       <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
           <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
               <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                   <tbody>
                       <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                           <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                               <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                                   <span style="color:#ffffff;line-height:inherit">Клиенты:&nbsp;</span>
                               </h1>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </div>   
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
       <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
           <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
               <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                   <tbody>
                       <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                           <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                               <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                                   <span style="color:#ffffff;line-height:inherit">${clients}</span>
                               </h1>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </div>
   </div>
   </div>
   </div>
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
       <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
           <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
               <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                   <tbody>
                       <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                           <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                               <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                                   <span style="color:#ffffff;line-height:inherit">Название:&nbsp;</span>
                               </h1>
                           </td>
                       </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </div>
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
       <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
               <tbody>
                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word"> 
                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                               <span style="color:#ffffff;line-height:inherit">${title}</span>
                           </h1>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
       <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
               <tbody>
                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                               <span style="color:#ffffff;line-height:inherit">Цена:&nbsp;</span>
                           </h1>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
   </div>
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
       <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
               <tbody>
                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word"> 
                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                               <span style="color:#ffffff;line-height:inherit">${price} руб.</span>
                           </h1>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word"> 
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
       <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
               <tbody>
                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                               <span style="color:#ffffff;line-height:inherit">Дата начала:&nbsp;</span>
                           </h1>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
   </div>
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
       <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
           <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
               <tbody>
                   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                       <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                           <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                               <span style="color:#ffffff;line-height:inherit">${dateParser(date_start)}</span>
                           </h1>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
   </div>
   </div>
   </div>
   </div>
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">  
   <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">  
       <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
           <tbody>
               <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                   <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                       <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                           <span style="color:#ffffff;line-height:inherit">Дата конца:&nbsp;</span>
                       </h1>
                   </td>
               </tr>
           </tbody>
       </table>
   </div>
   </div>
   </div>
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
   <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
   <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
       <tbody>
           <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
               <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                   <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                       <span style="color:#ffffff;line-height:inherit">${dateParser(date_end)}</span>
                   </h1>
               </td>
           </tr>
       </tbody>
   </table>
   </div>
   </div>
   </div>
   </div>
   </div></div> 
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid 5f85b861f827cbb9mixed-two-up" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 6c1d3df5dd05e20fnum4" style="display:table-cell;line-height:inherit;max-width:320px;min-width:216px;vertical-align:top;width:216px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
   <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
       <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
           <tbody>
               <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                   <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word"> 
                       <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:right">
                           <span style="color:#ffffff;line-height:inherit">Время:&nbsp;</span>
                       </h1>
                   </td>
               </tr>
           </tbody>
       </table>
   </div>
   </div>
   </div>
   <div class="66921356b8921501col b4e4c18c9ba9ab93num8" style="display:table-cell;line-height:inherit;max-width:320px;min-width:432px;vertical-align:top;width:433px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
   <div style="border:0px solid transparent;line-height:inherit;padding:5px 0px 5px 0px">
   <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
       <tbody>
           <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
               <td align="center" valign="top" width="100%" style="border-collapse:collapse;line-height:inherit;padding:0px;text-align:center;vertical-align:top;width:100%;word-break:break-word">
                   <h1 style="color:#555555;direction:ltr;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:23px;font-weight:normal;line-height:120%;margin-bottom:0;margin-top:0;text-align:left">
                       <span style="color:#ffffff;line-height:inherit">${(time === undefined)? '00:00': time}</span>
                   </h1>
               </td>
           </tr>
       </tbody>
   </table>
   </div>
   </div>
   </div>
   </div>
   </div></div> 
   <div style="background-color:transparent;line-height:inherit"> 
   <div class="84254d73117b9d63block-grid" style="background-color:#0062ff;line-height:inherit;margin:0 auto 0 auto;max-width:650px;min-width:320px;word-break:break-word;word-wrap:break-word">
   <div style="background-color:#0062ff;border-collapse:collapse;display:table;line-height:inherit;width:100%">
   <div class="66921356b8921501col 69217c56783e4118num12" style="display:table-cell;line-height:inherit;max-width:650px;min-width:320px;vertical-align:top;width:650px">
   <div class="cdc74ac1160e0eaccol_cont" style="line-height:inherit;width:100% !important">
   <div style="border:0px solid transparent;line-height:inherit;padding:20px 0px 60px 0px">
       <table class="35a86badd7a09b7dsocial_icons" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
           <tbody style="line-height:inherit">
               <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                   <td valign="top" style="border-collapse:collapse;line-height:inherit;padding:10px;vertical-align:top;word-break:break-word">
                       <table class="db52a2510d83f7bsocial_table" align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;line-height:inherit;table-layout:fixed;vertical-align:top">
                           <tbody style="line-height:inherit"><tr align="center" valign="top" style="border-collapse:collapse;display:inline-block;line-height:inherit;text-align:center;vertical-align:top">
                               <td valign="top" style="border-collapse:collapse;line-height:inherit;padding-bottom:0;padding-left:10px;padding-right:10px;vertical-align:middle;word-break:break-word">
                                   <a href="https://www.facebook.com/pages/category/Sports---Recreation/%D0%9E%D0%9E%D0%9E-%D0%AD%D0%BB%D0%BB%D0%B8%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD-112305267240823/" target="_blank" style="line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,LbZjTY1UmLQf4_0IaimXhA&amp;l=aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3BhZ2VzL2NhdGVnb3J5L1Nwb3J0cy0tLVJlY3JlYXRpb24vJUQwJTlFJUQwJTlFJUQwJTlFLSVEMCVBRCVEMCVCQiVEMCVCQiVEMCVCOCVEMCVCRCVEMCVCQiVEMCVCMCVEMCVCOSVEMCVCRC0xMTIzMDUyNjcyNDA4MjMv" data-orig-href="https://www.facebook.com/pages/category/Sports---Recreation/%D0%9E%D0%9E%D0%9E-%D0%AD%D0%BB%D0%BB%D0%B8%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD-112305267240823/" class="daria-goto-anchor" rel="noopener noreferrer">
                                       <img alt="Facebook" height="12" title="Facebook" width="12" style="border:0;display:block;height:auto;line-height:inherit;text-decoration:none" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAxMyAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik04LjU4MDc1IDIzLjI5NDFWMTIuODAyM0gxMi4xMjI1TDEyLjY1MTMgOC43MTQzOEg4LjU4MDc1VjYuMTAzOTZDOC41ODA3NSA0LjkxOTY5IDguOTEwNjMgNC4xMTI2MyAxMC42MTU0IDQuMTEyNjNIMTIuNzkxVjAuNDU0NTMzQzExLjczODMgMC4zNDQzMjUgMTAuNjgwNSAwLjI5MDc3OCA5LjYyMTk5IDAuMjk0MTIzQzYuNDg1NyAwLjI5NDEyMyA0LjMzMzk4IDIuMTk4OTkgNC4zMzM5OCA1LjY5OTE4VjguNzE0MzhIMC43OTEwMTZWMTIuODAyM0g0LjMzNzc2VjIzLjI5NDFIOC41ODA3NVoiIGZpbGw9IndoaXRlIi8+DQo8L3N2Zz4NCg==">
                                   </a>
                               </td>
                           <td valign="top" style="border-collapse:collapse;line-height:inherit;padding-bottom:0;padding-left:10px;padding-right:10px;vertical-align:middle;word-break:break-word">
                               <a href="https://vk.com/ellinline" target="_blank" style="line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,SPAJvaEBy4eBMWteba1jRg&amp;l=aHR0cHM6Ly92ay5jb20vZWxsaW5saW5l" data-orig-href="https://vk.com/ellinline" class="daria-goto-anchor" rel="noopener noreferrer">
                                   <img alt="Vkontakte" height="25" title="Vkontakte" width="25" style="border:0;display:block;height:auto;line-height:inherit;text-decoration:none" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTEuNTQ2IDEzLjIzNjdIMTIuOTIwMUMxMi45MjAxIDEzLjIzNjcgMTMuMzM1NCAxMy4xOTExIDEzLjU0NjYgMTIuOTYxOEMxMy43NDIzIDEyLjc1MyAxMy43MzYyIDEyLjM2MTggMTMuNzM2MiAxMi4zNjE4QzEzLjczNjIgMTIuMzYxOCAxMy43MDg2IDEwLjUxNzEgMTQuNTY0NCAxMC4yNDU5QzE1LjQyMDEgOS45NzQ2NSAxNi40OTE4IDEyLjAyODEgMTcuNjQwNCAxMi44MTY2QzE4LjUwODEgMTMuNDE2NyAxOS4xNjgyIDEzLjI4MjMgMTkuMTY4MiAxMy4yODIzTDIyLjIzODIgMTMuMjM5MUMyMi4yMzgyIDEzLjIzOTEgMjMuODQ0IDEzLjEzOTUgMjMuMDc4MyAxMS44NzY5QzIzLjAxNTkgMTEuNzczNyAyMi42MzQyIDEwLjk0MzIgMjAuNzk4IDkuMjM2NTVDMTguODc3NyA3LjQ1MDcxIDE5LjEzMSA3LjczODc1IDIxLjQ1MDkgNC42NDgzNEMyMi44NTk5IDIuNzYxNjkgMjMuNDI4NyAxLjYxNTU0IDIzLjI1MjMgMS4xMjEwN0MyMy4wODQzIDAuNjU1NDEgMjIuMDQ1IDAuNzc1NDI2IDIyLjA0NSAwLjc3NTQyNkwxOC41ODg1IDAuNzk3MDI5QzE4LjQzNTEgMC43Nzg4NjMgMTguMjc5OCAwLjgwNjQyIDE4LjE0MiAwLjg3NjIzOUMxOC4wMTA3IDAuOTcyMDQ4IDE3LjkwNTggMS4wOTk2NSAxNy44MzcyIDEuMjQ3MDlDMTcuNDc5MiAyLjE3NjEyIDE3LjA1MjMgMy4wNzcxNCAxNi41NjAyIDMuOTQyNjVDMTUuMDIwNCA2LjU1NjU5IDE0LjM5OTkgNi42OTQ2MSAxNC4xNTk5IDYuNTMyNTlDMTMuNTc0MiA2LjE1MzM0IDEzLjcyMDYgNS4wMTE5OSAxMy43MjA2IDQuMjAxODhDMTMuNzIwNiAxLjY2ODM0IDE0LjEwNDcgMC42MTIyMDQgMTIuOTcxNyAwLjMzODU2OEMxMi41OTAxIDAuMjQ3MzU2IDEyLjMxNDEgMC4xODg1NDggMTEuMzUyNyAwLjE3NTM0NkMxMC4xMTkgMC4xNjMzNDUgOS4wNzI0MyAwLjE3NTM0NiA4LjQ4NDM1IDAuNDY5Mzg1QzguMDkwNyAwLjY2MzgxMSA3Ljc4NzA2IDEuMDkzNDcgNy45Nzc4OCAxLjExODY3QzguMjA3MTEgMS4xNDg2OCA4LjcyNDM4IDEuMjU3ODkgOC45OTgwMiAxLjYzMTE0QzkuMzU4MDcgMi4xMTEyIDkuMzQwMDcgMy4xOTEzNSA5LjM0MDA3IDMuMTkxMzVDOS4zNDAwNyAzLjE5MTM1IDkuNTM4MDkgNi4xNzYxNCA4Ljg1ODggNi41NDgxOUM4LjM5MzE0IDYuODAxNDMgNy43NTM0NSA2LjI4Mjk2IDYuMzgxNjcgMy45MDc4NEM1LjkxNTczIDMuMDgzODYgNS41MDMyMyAyLjIzMDc5IDUuMTQ2NzEgMS4zNTM5QzUuMDgyMTkgMS4yMDQzOCA0Ljk4MzA1IDEuMDcyMzMgNC44NTc0NyAwLjk2ODY1MkM0LjY5NzA4IDAuODYxNzQ2IDQuNTE2NTggMC43ODg2NDkgNC4zMjcgMC43NTM4MjNMMS4wNDU3NiAwLjc3NTQyNkMxLjA0NTc2IDAuNzc1NDI2IDAuNTUyNDk4IDAuNzg5ODI4IDAuMzcyNDc0IDEuMDA0NjZDMC4yMTA0NTMgMS4xOTU0OCAwLjM1OTI3MiAxLjU4OTEzIDAuMzU5MjcyIDEuNTg5MTNDMC4zNTkyNzIgMS41ODkxMyAyLjkzNzIxIDcuNjA2NzMgNS44NDI4IDEwLjYzODNDOC41MTMxNSAxMy40MTkxIDExLjU0NiAxMy4yMzY3IDExLjU0NiAxMy4yMzY3WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K">
                               </a>
                           </td>
                       <td valign="top" style="border-collapse:collapse;line-height:inherit;padding-bottom:0;padding-left:10px;padding-right:10px;vertical-align:middle;word-break:break-word">
                           <a href="https://www.instagram.com/ellinlinespb/" target="_blank" style="line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,B9_slb1iV8plTbBhm6CY7Q&amp;l=aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9lbGxpbmxpbmVzcGIv" data-orig-href="https://www.instagram.com/ellinlinespb/" class="daria-goto-anchor" rel="noopener noreferrer">
                               <img alt="Instagram" height="21" title="Instagram" width="21" style="border:0;display:block;height:auto;line-height:inherit;text-decoration:none" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik05Ljc5MDM4IDIuMDA3QzEyLjMyNzUgMi4wMDcgMTIuNjI4NiAyLjAxNTkzIDEzLjYyOTkgMi4wNjE4NUMxNC41NTYgMi4xMDM5NSAxNS4wNTg2IDIuMjU5NTcgMTUuMzk0MSAyLjM4OTY4QzE1LjgwODUgMi41NDE3IDE2LjE4MzQgMi43ODQ5NiAxNi40OTExIDMuMTAxNDZDMTYuODA2OCAzLjQwNzU5IDE3LjA0OTYgMy43ODA3NiAxNy4yMDE2IDQuMTkzMzdDMTcuMzI5MiA0LjUyODg1IDE3LjQ4NiA1LjAzMTQ0IDE3LjUyOTQgNS45NTc1MkMxNy41NzQxIDYuOTU4ODYgMTcuNTg0MyA3LjI1OTkgMTcuNTg0MyA5Ljc5NTc5QzE3LjU4NDMgMTIuMzMxNyAxNy41NzQxIDEyLjYzNCAxNy41Mjk0IDEzLjYzNTNDMTcuNDg2IDE0LjU2MTQgMTcuMzMxNyAxNS4wNjQgMTcuMjAxNiAxNS4zOTk1QzE3LjA0MzUgMTUuODA5IDE2LjgwMTUgMTYuMTgwOSAxNi40OTEgMTYuNDkxNEMxNi4xODA2IDE2LjgwMTggMTUuODA4NyAxNy4wNDM4IDE1LjM5OTIgMTcuMjAxOUMxNS4wNjM3IDE3LjMyOTUgMTQuNTYxMSAxNy40ODY0IDEzLjYzNSAxNy41Mjk3QzEyLjYzMzcgMTcuNTc0NCAxMi4zMzI2IDE3LjU4NDYgOS43OTU0OCAxNy41ODQ2QzcuMjU4MzIgMTcuNTg0NiA2Ljk1ODU2IDE3LjU3NDQgNS45NTcyMSAxNy41Mjk3QzUuMDMxMTMgMTcuNDg2NCA0LjUyODU1IDE3LjMzMiA0LjE5MzA2IDE3LjIwMTlDMy43Nzk0NCAxNy4wNTE1IDMuNDA0OTQgMTYuODEgMy4wOTczMyAxNi40OTUyQzIuNzgxOTMgMTYuMTg4OSAyLjUzOTE1IDE1LjgxNTggMi4zODY4MiAxNS40MDMzQzIuMjU5MjYgMTUuMDY3OCAyLjEwMTA5IDE0LjU2NTIgMi4wNTg5OSAxMy42MzkyQzIuMDEzMDcgMTIuNjM3OCAyLjAwNDE0IDEyLjMzNjggMi4wMDQxNCA5Ljc5OTYyQzIuMDA0MTQgNy4yNjI0NiAyLjAxMzA3IDYuOTYyNjkgMi4wNTg5OSA1Ljk2MTM1QzIuMTAxMDkgNS4wMzUyNiAyLjI1NjcxIDQuNTMyNjggMi4zODY4MiA0LjE5NzJDMi41MzgzMyAzLjc4MzIxIDIuNzgxMTggMy40MDg2OSAzLjA5NzMzIDMuMTAxNDZDMy40MDM0NSAyLjc4NTc5IDMuNzc2NjIgMi41NDI5NyA0LjE4OTI0IDIuMzkwOTVDNC41MjQ3MiAyLjI2MzQgNS4wMjczIDIuMTA1MjIgNS45NTMzOSAyLjA2MzEzQzYuOTU0NzMgMi4wMTcyMSA3LjI1NTc3IDIuMDA4MjggOS43OTE2NSAyLjAwODI4TDkuNzkwMzggMi4wMDdaTTkuNzkwMzggMC4yOTUxNTFDNy4yMTExMiAwLjI5NTE1MSA2Ljg4NzEyIDAuMzA2NjMxIDUuODc0MyAwLjM1MjU1M0M1LjA4NjEyIDAuMzY4MjMzIDQuMzA2MyAwLjUxNzQ2OCAzLjU2ODAyIDAuNzkzOTA5QzIuOTM0MDUgMS4wMzIyMiAyLjM1OTgyIDEuNDA2MTkgMS44ODU1MSAxLjg4OTY1QzEuNDAyMDUgMi4zNjM5NiAxLjAyODA4IDIuOTM4MTkgMC43ODk3NzQgMy41NzIxNkMwLjUxMzMzMyA0LjMxMDQ0IDAuMzY0MDk4IDUuMDkwMjUgMC4zNDg0MTcgNS44Nzg0M0MwLjMwMjQ5NiA2Ljg5MTI2IDAuMjkxMDE2IDcuMjE1MjYgMC4yOTEwMTYgOS43OTQ1MUMwLjI5MTAxNiAxMi4zNzM4IDAuMzAyNDk2IDEyLjY5OSAwLjM0ODQxNyAxMy43MTE5QzAuMzY0MDk4IDE0LjUwMDEgMC41MTMzMzMgMTUuMjc5OSAwLjc4OTc3NCAxNi4wMTgxQzEuMDI4MDggMTYuNjUyMSAxLjQwMjA1IDE3LjIyNjMgMS44ODU1MSAxNy43MDA3QzIuMzYwMzMgMTguMTgyMyAyLjkzNDUyIDE4LjU1NDUgMy41NjgwMiAxOC43OTEzQzQuMzA2MyAxOS4wNjc3IDUuMDg2MTIgMTkuMjE3IDUuODc0MyAxOS4yMzI2QzYuODg3MTIgMTkuMjc4NiA3LjIxMTEyIDE5LjI5IDkuNzkwMzggMTkuMjlDMTIuMzY5NiAxOS4yOSAxMi42OTQ5IDE5LjI3ODYgMTMuNzA3NyAxOS4yMzI2QzE0LjQ5NTkgMTkuMjE3IDE1LjI3NTcgMTkuMDY3NyAxNi4wMTQgMTguNzkxM0MxNi42NDM2IDE4LjU0NzEgMTcuMjE1MyAxOC4xNzQ0IDE3LjY5MjggMTcuNjk2OUMxOC4xNzAzIDE3LjIxOTUgMTguNTQzIDE2LjY0NzcgMTguNzg3MiAxNi4wMTgxQzE5LjA2MzYgMTUuMjc5OSAxOS4yMTI4IDE0LjUwMDEgMTkuMjI4NSAxMy43MTE5QzE5LjI3NDQgMTIuNjk5IDE5LjI4NTkgMTIuMzc1IDE5LjI4NTkgOS43OTQ1MUMxOS4yODU5IDcuMjEzOTggMTkuMjc0NCA2Ljg5MTI2IDE5LjIyODUgNS44Nzg0M0MxOS4yMTI4IDUuMDkwMjUgMTkuMDYzNiA0LjMxMDQ0IDE4Ljc4NzIgMy41NzIxNkMxOC41NDg4IDIuOTM4MTkgMTguMTc0OSAyLjM2Mzk2IDE3LjY5MTQgMS44ODk2NUMxNy4yMTcxIDEuNDA2MTkgMTYuNjQyOSAxLjAzMjIyIDE2LjAwODkgMC43OTM5MDlDMTUuMjcyMiAwLjUxODAzMyAxNC40OTQyIDAuMzY4ODA4IDEzLjcwNzcgMC4zNTI1NTNDMTIuNjk0OSAwLjMwNjYzMSAxMi4zNzA5IDAuMjk1MTUxIDkuNzkwMzggMC4yOTUxNTFaIiBmaWxsPSJ3aGl0ZSIvPg0KPHBhdGggZD0iTTkuNzkxMjcgNC45MTY2M0M4LjgyNjIxIDQuOTE2NjMgNy44ODI4MiA1LjIwMjgyIDcuMDgwNDIgNS43MzlDNi4yNzgwMiA2LjI3NTE5IDUuNjUyNjUgNy4wMzcyOCA1LjI4MzM5IDcuOTI4OUM0LjkxNDE0IDguODIwNTMgNC44MTc1OSA5LjgwMTYzIDUuMDA1OTYgMTAuNzQ4MUM1LjE5NDMyIDExLjY5NDYgNS42NTkxNCAxMi41NjQgNi4zNDE2MyAxMy4yNDYzQzcuMDI0MTIgMTMuOTI4NiA3Ljg5MzYyIDE0LjM5MzIgOC44NDAxNyAxNC41ODEzQzkuNzg2NzIgMTQuNzY5NSAxMC43Njc4IDE0LjY3MjcgMTEuNjU5MyAxNC4zMDMyQzEyLjU1MDggMTMuOTMzNyAxMy4zMTI4IDEzLjMwODEgMTMuODQ4OCAxMi41MDU2QzE0LjM4NDcgMTEuNzAzIDE0LjY3MDcgMTAuNzU5NiAxNC42NzA0IDkuNzk0NUMxNC42NzA0IDkuMTUzODIgMTQuNTQ0MiA4LjUxOTQyIDE0LjI5OSA3LjkyNzUzQzE0LjA1MzggNy4zMzU2MyAxMy42OTQ0IDYuNzk3ODQgMTMuMjQxMyA2LjM0NDg3QzEyLjc4ODIgNS44OTE5IDEyLjI1MDMgNS41MzI2MyAxMS42NTgzIDUuMjg3NTdDMTEuMDY2NCA1LjA0MjUxIDEwLjQzMTkgNC45MTY0NiA5Ljc5MTI3IDQuOTE2NjNaTTkuNzkxMjcgMTIuOTYxOEM5LjE2NDgzIDEyLjk2MTggOC41NTI0NyAxMi43NzYgOC4wMzE2MSAxMi40MjhDNy41MTA3NSAxMi4wOCA3LjEwNDc4IDExLjU4NTMgNi44NjUwNiAxMS4wMDY2QzYuNjI1MzMgMTAuNDI3OCA2LjU2MjYxIDkuNzkwOTkgNi42ODQ4MiA5LjE3NjU5QzYuODA3MDMgOC41NjIyIDcuMTA4NjkgNy45OTc4NCA3LjU1MTY0IDcuNTU0ODhDNy45OTQ2IDcuMTExOTMgOC41NTg5NiA2LjgxMDI3IDkuMTczMzYgNi42ODgwNkM5Ljc4Nzc1IDYuNTY1ODUgMTAuNDI0NiA2LjYyODU3IDExLjAwMzMgNi44NjgzQzExLjU4MjEgNy4xMDgwMiAxMi4wNzY4IDcuNTEzOTggMTIuNDI0OCA4LjAzNDg0QzEyLjc3MjggOC41NTU3IDEyLjk1ODYgOS4xNjgwNyAxMi45NTg2IDkuNzk0NUMxMi45NTg2IDEwLjYzNDUgMTIuNjI0OSAxMS40NDAxIDEyLjAzMDkgMTIuMDM0MUMxMS40MzY5IDEyLjYyODEgMTAuNjMxMyAxMi45NjE4IDkuNzkxMjcgMTIuOTYxOFoiIGZpbGw9IndoaXRlIi8+DQo8cGF0aCBkPSJNMTQuODYzIDUuODY0NEMxNS40OTI5IDUuODY0NCAxNi4wMDM0IDUuMzUzODMgMTYuMDAzNCA0LjcyNDAyQzE2LjAwMzQgNC4wOTQyIDE1LjQ5MjkgMy41ODM2MyAxNC44NjMgMy41ODM2M0MxNC4yMzMyIDMuNTgzNjMgMTMuNzIyNyA0LjA5NDIgMTMuNzIyNyA0LjcyNDAyQzEzLjcyMjcgNS4zNTM4MyAxNC4yMzMyIDUuODY0NCAxNC44NjMgNS44NjQ0WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K">
                           </a>
                       </td>
                   <td valign="top" style="border-collapse:collapse;line-height:inherit;padding-bottom:0;padding-left:10px;padding-right:10px;vertical-align:middle;word-break:break-word">
                       <a href="https://www.youtube.com/" target="_blank" style="line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,KNSMzVbLh_c_IyRsNNfcsw&amp;l=aHR0cHM6Ly93d3cueW91dHViZS5jb20v" data-orig-href="https://www.youtube.com/" class="daria-goto-anchor" rel="noopener noreferrer">
                           <img alt="YouTube" height="22" title="YouTube" width="22" style="border:0;display:block;height:auto;line-height:inherit;text-decoration:none" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0yMC40NDM3IDEyLjAzNjdDMjAuMzMyOCAxMi41NTE1IDIwLjA2NDkgMTMuMDE4OCAxOS42Nzc0IDEzLjM3MzZDMTkuMjg5OCAxMy43Mjg0IDE4LjgwMTggMTMuOTUzMiAxOC4yODEyIDE0LjAxNjZDMTUuODAyNiAxNC4yOTUyIDEzLjI5MjcgMTQuMjk1MiAxMC43OTQxIDE0LjI5NTJDOC4yOTU1NCAxNC4yOTUyIDUuNzg4MiAxNC4yOTUyIDMuMzA0NiAxNC4wMTY2QzIuNzg0MjEgMTMuOTUyOSAyLjI5NjQ5IDEzLjcyODEgMS45MDkxNyAxMy4zNzMzQzEuNTIxODYgMTMuMDE4NCAxLjI1NDE4IDEyLjU1MTMgMS4xNDMzMiAxMi4wMzY3QzAuNzkxMDE2IDEwLjUyMjMgMC43OTEwMTYgOC44NjIyOSAwLjc5MTAxNiA3LjI5NTE3QzAuNzkxMDE2IDUuNzI4MDQgMC43OTEwMTYgNC4wNjgwNiAxLjEzODMyIDIuNTQ3MzZDMS4yNTA1NyAyLjAzMzgyIDEuNTE4OTkgMS41NjgwMSAxLjkwNjQyIDEuMjE0NDJDMi4yOTM4NSAwLjg2MDgyNiAyLjc4MTE1IDAuNjM2OTI3IDMuMzAwODUgMC41NzM3MUM1Ljc4MDcxIDAuMjk1MTY1IDguMjg2OCAwLjI5MzkxMSAxMC43ODU0IDAuMjk1MTY1QzEzLjI4NCAwLjI5NjQyIDE1Ljc5NTEgMC4yOTUxNjUgMTguMjc0OSAwLjU3MzcxQzE4Ljc5NDUgMC42MzY5OTIgMTkuMjgxNiAwLjg2MDk0IDE5LjY2ODggMS4yMTQ1NEMyMC4wNTYgMS41NjgxNSAyMC4zMjQyIDIuMDMzOTIgMjAuNDM2MiAyLjU0NzM2QzIwLjc4NDggNC4wNjgwNiAyMC43ODczIDUuNzI5MjkgMjAuNzg3MyA3LjI5NTE3QzIwLjc4NzMgOC44NjEwNCAyMC43OTIzIDEwLjUyMjMgMjAuNDQzNyAxMi4wMzY3Wk04LjY5MjgyIDQuNTU3NFYxMC4xMjdMMTMuOTgxMSA3LjM0MTU5TDguNjkyODIgNC41NTc0WiIgZmlsbD0id2hpdGUiLz4NCjwvc3ZnPg0K">
                       </a>
                   </td>
               </tr>
           </tbody>
       </table>
   </td>
   </tr>
   </tbody>
   </table>
   <table class="3bb00f1abf602ceadivider" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0;line-height:inherit;min-width:100%;table-layout:fixed;vertical-align:top">
   <tbody style="line-height:inherit">
   <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
   <td class="6fd22eac301d21f1divider_inner" valign="top" style="border-collapse:collapse;line-height:inherit;min-width:100%;padding:10px;vertical-align:top;word-break:break-word">
       <table class="cc5372ca4c47819cdivider_content" align="center" border="0" cellpadding="0" cellspacing="0" height="0" width="60%" style="border-collapse:collapse;border-spacing:0;border-top-color:#fff;border-top-style:solid;border-top-width:5px;height:0px;line-height:inherit;table-layout:fixed;vertical-align:top;width:60%">
           <tbody style="line-height:inherit">
               <tr valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top">
                   <td height="0" valign="top" style="border-collapse:collapse;line-height:inherit;vertical-align:top;word-break:break-word">
                       <span style="line-height:inherit"></span>
                   </td>
               </tr>
           </tbody>
       </table>
   </td>
   </tr>
   </tbody>
   </table> 
   <div style="color:#555555;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;line-height:1.5;padding:10px"> 
   <div class="3adb81e5738dd8c4txtTinyMce-wrapper" style="color:#555555;font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:12px;line-height:1.5"> 
   <p style="font-family:'timesnewroman' , 'times new roman' , 'times' , 'beskerville' , 'georgia' , serif;font-size:14px;line-height:1.5;margin:0;text-align:center;word-break:break-word">
       <span style="color:#ffffff;line-height:inherit">🏠 
           <span class="js-extracted-address js-extracted-highlighted-address mail-Message-Map-Link" data-address="ул. Зайцева 3, Санкт-Петербург" data-address-query="санкт-петербург улица зайцева 3" data-ids="175077435514035163">ул. Зайцева 3, 
               <span class="mail-Message-Map-NoBreak">Санкт-Петербург<span class="mail-Message-Map-Link-Icon icon"></span>
           </span>
       </span> 
       | 📧 
       <a href="mailto:7840054@mail.ru" rel="noopener" target="_blank" title="7840054@mail.ru" style="color:#ffffff;line-height:inherit;text-decoration:underline" class="ns-action" data-click-action="common.go" data-params="new_window&amp;url=%23compose%2Fmailto%3D7840054%2540mail.ru">7840054@mail.ru</a> 
       | 📞&nbsp;
       <a href="tel:+78127840054" rel="noopener noreferrer" target="_blank" title="tel:+78127840054" style="color:#ffffff;line-height:inherit;text-decoration:underline" class="daria-goto-anchor">+7&nbsp;(812)&nbsp;784-00-54</a>
       <a href="mailto:7840054@mail.ru" rel="noopener" target="_blank" title="7840054@mail.ru" style="color:#ffffff;line-height:inherit;text-decoration:underline" class="ns-action" data-click-action="common.go" data-params="new_window&amp;url=%23compose%2Fmailto%3D7840054%2540mail.ru"></a>
       <a href="https://vk.com/ellinline?w=address-35416944_4390" style="color:#ffffff;line-height:inherit" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=758051683&amp;c=LIZA&amp;cv=24.8.0&amp;mid=175077435514035163&amp;h=a,p2Ml4-r2sB1qn2euCgx-Dw&amp;l=aHR0cHM6Ly92ay5jb20vZWxsaW5saW5lP3c9YWRkcmVzcy0zNTQxNjk0NF80Mzkw" data-orig-href="https://vk.com/ellinline?w=address-35416944_4390" class="daria-goto-anchor" target="_blank" rel="noopener noreferrer"></a>
       </span>
   </p>
   </div>
   </div>
   </div>
   </div>
   </div>
   </div> </div> </div>`
}