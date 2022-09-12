import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import * as React from 'react';




import {GoogleLogout} from 'react-google-login'
import useDrivePicker from 'react-google-drive-picker'
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useState } from 'react';
import { Link } from 'react-router-dom';
const private_data = require('./hip-caster-362015-b0cbe119322b.json')


const client_id = '1002643795871-ic0d85gucomsc0mt4l0o056v9ootbfck.apps.googleusercontent.com'


function Logout(props) {
  
  const [allsheets,setallsheets] = useState([]);
  var [alljson,setallJson]=useState([]);
  const [openPicker, authResponse] = useDrivePicker();




    var token = localStorage.getItem("gaccesstoken");
    
    

    const onSuccess = (res) =>{
        console.log("logout success")
        localStorage.removeItem("gaccesstoken");
        window.location.reload();
    }

    async function onSheetSelected(id) {
        var sheetsall = [];
        const doc = new GoogleSpreadsheet(id);
        console.log(id)
        //admin oauth service acount credentials validation
        await doc.useServiceAccountAuth({
            client_email: private_data.client_email,
            private_key: private_data.private_key
          });
        await doc.loadInfo();
        console.log(doc)
        console.log(doc['_rawSheets']);
        

        //selecting spectficsheet from raw data
        var sheets = Object.keys(doc['_rawSheets']);
        sheets.map((item,index)=>{
            sheetsall.push({
                name:doc['_rawSheets'][item]['_rawProperties']['title'],
                id:item
            })
        })
        console.log(sheetsall)
        setallsheets(sheetsall)

        var valuesall = [];


        //parsing data to json iobject
        sheetsall.map(async(item,index)=>{
          console.log(index)
          const sheet = doc.sheetsById[sheetsall[index]['id']]
          const sheet_data = await sheet.getRows();
          var currectsheetdata = [];
          sheet_data.map((item,index)=>{
            currectsheetdata.push(item['_rawData'])
          })
          valuesall.push({
            name:item['name'],
            data:currectsheetdata
          })
        })

        console.log(valuesall)
        setallJson(valuesall);
        alljson=valuesall;

        //data printing
        console.log("all sheets wisedatta is here")
        console.log(alljson)


        //pushing data to the table page to show them
        window.location.replace('/table',state=alljson)
        
        
    }


    const handleOpenPicker = () => {
        openPicker({
          clientId: client_id,
          developerKey:"AIzaSyCgdrj5q7MKNiI9EXlNmgmgv_BRkDhQgP8",
          viewId: "SPREADSHEETS",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          // customViews: customViewsArray, // custom view
          callbackFunction: (data) => {
            if (data.action === 'cancel') {
              console.log('User clicked cancel/close button')
            }
            console.log(data)
            onSheetSelected(data.docs[0].id)
          },
        })
      }
    return(
        <div id="signinButton">
            <GoogleLogout
                clientId={client_id}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />

            <button onClick={() => handleOpenPicker()}>Open Spreadsheets</button>
            



            {/* <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>cell1</TableCell>
                    <TableCell align="right">cell2</TableCell>
                    <TableCell align="right">cell3&nbsp;(g)</TableCell>
                    <TableCell align="right">cell4&nbsp;(g)</TableCell>
                    <TableCell align="right">cell5&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alljson[0]['data'].map((row) => (
                    <TableRow
                      key={row[0]}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="right">{row[1]}</TableCell>
                      <TableCell align="right">{row[2]}</TableCell>
                      <TableCell align="right">{row[3]}</TableCell>
                      <TableCell align="right">{row[4]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}


        
        </div>
    )
}
export default Logout;