import React from 'react';
import { Box } from '@mui/system';
import { CustomH1 } from '../components/CustomTypography/CustomTypography';
import { TextInput, TextArea } from '../components/TextInput/TextInput';
import { CustomButtonPrimary } from '../components/CustomButton/CustomButton';
import { useState } from 'react';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../utils/queries';
import client from "../utils/apollo-client"
import { start } from 'repl';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';

const CuEvent = () => {
    const [nameEvent, setNameEvent] = useState<string>("");
    const [categoryEvent, setCategoryEvent] = useState<string>("");
    const [categoryEventInt, setCategoryEventInt] = useState<number>(1);
    const [linkEvent, setLinkEvent] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [imgEvent, setImgEvent] = useState<string>("");
    const [detailEvent, setDetailEvent] = useState<string>("");

    const [nameEventError, setNameEventError] = useState<string>("");
    const [categoryEventError, setCategoryEventError] = useState<string>("");
    const [linkEventError, setLinkEventError] = useState<string>("");
    const [startDateError, setStartDateError] = useState<string>("");
    const [imgEventError, setImgEventError] = useState<string>("");
    const [detailEventError, setDetailEventError] = useState<string>("");
    const [disabledVal, setDisabled] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>("");
    const [setCuEvent] = useMutation(CREATE_EVENT);
    const router = useRouter();

    useEffect(() => {
      if(localStorage.getItem("token")!==null){
              setToken(localStorage.getItem("token"))          
          }else{
              router.replace('/login-page')
          }
    }, []);

    const handleSubmit = async () => {
        if (nameEvent === "") {
          setNameEventError("Name is required");
        } else if (categoryEvent === "") {
          setCategoryEventError("Category is required");
        } else if (linkEvent === "") {
            setLinkEventError("Link/Location is required");
        } else if (startDate === "") {
            setStartDateError("Start Date is required");
        } else if (imgEvent === "") {
            setImgEventError("Img is required");
        } else if (detailEvent === "") {
            setDetailEventError("Detail is required");
        } else if (nameEventError === "") {
          setDisabled(true);   

          setCuEvent({
            variables: {id_category: categoryEventInt,
              title: nameEvent,
              start_date: startDate,
              end_date: endDate,
              location: linkEvent,
              details: detailEvent,
              photo: imgEvent
            },
            context: {
                      headers: { 
                        Authorization: `Bearer ${token}`,
                      },
                    },
        })
          router.push('/events')        
          
        }
      };

    const handleNameEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameEvent(value);
        var len = e.target.value.length;
        if (len > 20) {
          setNameEventError("your name is too long");
        } else {
          setNameEventError("");
        }
      };

    const handleCategoryEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value =parseInt(e.target.value);
        setCategoryEvent(e.target.value);
        setCategoryEventInt(value);

        // if (len > 1000) {
        //   setCategoryEventError("your name is too long");
        // } else {
        //   setCategoryEventError("");
        // }
      };

      const handleLinkEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLinkEvent(value);
        var len = e.target.value.length;
        if (len > 1000) {
          setLinkEventError("your name is too long");
        } else {
          setLinkEventError("");
        }
      };
      const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartDate(value);
        var len = e.target.value.length;
        if (len > 1000) {
          setStartDateError("your name is too long");
        } else {
          setStartDateError("");
        }
      };
      const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndDate(value);
        var len = e.target.value.length;
      };
      const handleImgEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setImgEvent(value);
        var len = e.target.value.length;
        if (len > 1000) {
          setImgEventError("your name is too long");
        } else {
          setImgEventError("");
        }
      };

      const handleDetailEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDetailEvent(value);
        var len = e.target.value.length;
        if (len > 1000) {
          setDetailEventError("your name is too long");
        } else {
          setDetailEventError("");
        }
      };


  return (
    <Box>
      <Header isHidden={true}/>
      <Box sx={{ 
          width: "90wh", 
          margin: "5% ",
       }}>
           <Box sx={{ 
               textAlign:"center",
            }}>
               <CustomH1 content='My Event'/>
           </Box>
           <Box sx={{ 
               display:"flex",
               flexDirection:"column",
               gap:"2vh",

            }}>
               <Box sx={{ 
                   display:"flex",
                   flexDirection:"row",
                   gap:"3vh",
                }}>
                    <Box sx={{ 
                        width: "50%",
                     }}>
                    <TextInput textLabel='Nama Event' placeholder='Ngobar Sabtu' type='text' onChange={(e) => handleNameEvent(e)} errorVal={nameEventError}/>
                    </Box>
                    <Box sx={{ 
                        width: "50%",
                     }}>
                    <TextInput textLabel='Kategori' placeholder='Technology' type='text' onChange={(e) => handleCategoryEvent(e)} errorVal={categoryEventError}/>
                    </Box>                   
               </Box>
               <Box>
                    <TextInput textLabel='Lokasi/link' placeholder='Pematang Siantar' type='text' onChange={(e) => handleLinkEvent(e)} errorVal={linkEventError}/>
               </Box>
               <Box sx={{ 
                   display:"flex",
                   flexDirection:"row",
                   gap:"3vh",
                }}>
                    <Box sx={{ 
                        width: "50%",
                     }}>
                    <TextInput textLabel='Start Date' placeholder='13-05-2022' type='text' onChange={(e) => handleStartDate(e)} errorVal={startDateError}/>
                    </Box>
                    <Box sx={{ 
                        width: "50%",
                     }}>
                    <TextInput textLabel='End Date' placeholder='13-05-2022' type='text' onChange={(e) => handleEndDate(e)} />
                    </Box>           
               </Box>
               <Box>
                    <TextInput textLabel='Image' placeholder='url image event anda' type='text' onChange={(e) => handleImgEvent(e)} errorVal={imgEventError}/>
                </Box>
                <Box>
                    <TextArea textLabel='Detail' placeholder='Detail/deskripsi event anda' type='text' onChange={(e) => handleDetailEvent(e)} errorVal={detailEventError}/>
                </Box>
                <Box sx={{ 
                    textAlign :"end"
                 }}>
                    <CustomButtonPrimary width='25vh' caption='SIMPAN' OnClick={handleSubmit} isDisabled={disabledVal}/>
                </Box>
           </Box>
      </Box>
      <Footer/>
      </Box>
  );
};

export default CuEvent;
