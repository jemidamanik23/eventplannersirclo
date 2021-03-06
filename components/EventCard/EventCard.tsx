import * as React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/nunito";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {ButtonCancel, ButtonDelete, ButtonEdit } from "../CustomButton/CustomButton";
import { CustomH2, CustomParagraph } from "../CustomTypography/CustomTypography";


interface eventcard {
  srcImage?: string;
  eventTitle: string;
  time: string;
  category:string |number;
  handleDelete?:()=>void |any;
  handleEdit?:()=>void

}

function EventCard(props: eventcard) {
  return (
      <Box sx={{ 
          width: "100%",
          background: "#A95050",
          borderRadius:"10px",
          boxShadow:"5px 5px 0px rgba(0, 0, 0, 0.5)",
       }}>
           <Box sx={{ 
               padding:"1%",

            }}>
            <Box>
                <CustomH2 content={props.eventTitle}/>

            </Box>
            <Box sx={{ 
                display:"flex",
                flexDirection:"row",
                gap:"5px",
                justifyContent: "space-between",
             }}>
                <Box sx={{ width: '60%' }}>
                    <CustomParagraph content={props.category}/>
                    <CustomParagraph content={props.time}/>
                </Box>
                <Box sx={{ 
                    width:{xs:"45%",sm:"25%", md:"20%"},
                    display:"flex",
                    flexDirection:"row",
                    paddingRight: {xs:"40%",sm:"5%", md:"0%"},
                    gap:{xs:"10%", md:"4%"}, }}>
                    <ButtonEdit OnClick={props.handleEdit}/>
                    <ButtonDelete OnClick={props.handleDelete}/>                    

                </Box>
            </Box>

           </Box>
          

      </Box>

  );
}

interface eventhistorycard {
    eventTitle?: string;
    category?:string;
    handleDelete?:()=>void
    handleCancel?:()=>void
  }

function EventHistoryCard(props: eventhistorycard) {
    return (
        <Box sx={{ 
            width: "100%",
            background: "#A95050",
            borderRadius:"10px",
            boxShadow:"5px 5px 0px rgba(0, 0, 0, 0.5)",
         }}>
             <Box sx={{ 
                 padding:"1%",
  
              }}>
              <Box>
                  <CustomH2 content={props.eventTitle}/>
  
              </Box>
  
             </Box>
            
  
        </Box>
  
    );
  }

export {EventCard, EventHistoryCard};
