import { Email, Router } from "@mui/icons-material";
import { Box } from "@mui/material"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CustomH1, CustomParagraph } from "../components/CustomTypography/CustomTypography"
import client from '../utils/apollo-client'
import { Users } from '../types/users'
import GetToken from "../utils/getToken";
import PrivateRoute from "../utils/privateRoute";
import { CustomButtonPrimary, CustomButtonSecondary } from "../components/CustomButton/CustomButton";
import { GET_PROFILE } from "../utils/queries";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { useQuery } from "@apollo/client";

const Profile = () => {
    const [name, setName] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [id, setId] = useState<number|string|null>();
    const [token, setToken] = useState<string | null>("");
    const router = useRouter();    
    let idUser: number|string|null  ;
    const { data, refetch } = useQuery(GET_PROFILE, {
        variables : {id: id},
            context: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    )

    useEffect(() => {
        if(localStorage.getItem("token")!==null){
            setToken(localStorage.getItem("token"))          
        } else {
            router.replace('/login-page')
        }
        setId(localStorage.getItem("id_user"))
        refetch();
        console.log(router.route);
        console.log(data )
        
        
    }, [router.route]);  


    // useEffect(()=>{
    //     console.log("TESt")
    // }, [router.pathname])

    const goEdit = () => {
    router.replace('/profile-edit')
    };

    const fetchData = async() => {
        const { data } = await client.query({
            query: GET_PROFILE,
            variables: {id: idUser},
            context: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        })
        
        setName(data.usersById.name)
        setEmail(data.usersById.email)
        setBirthday(data.usersById.birth_date)
        setPassword(data.usersById.password)
        setGender(data.usersById.gender)
        setAddress(data.usersById.address)
        setPhone(data.usersById.phone_number)
        setImage(data.usersById.photo)
    }

    return(
        <Box>
            <Header isHidden={true}/>
        <Box  sx={{ 
            margin:"5% 10% 5% 10%",
            minHeight: "80vh"
         }}>
             <CustomH1 content="Profile"/>
             <Box sx={{ 
                 display: "flex",
                 flexDirection :"column-reverse",                 
                 justifyContent :"center",
                 alignItems :"center",
                 margin: "3% 0%"
              }}>
                  
                 <Box >
                    <img
                        style={{
                        height: "200px",
                        width: "200px",
                        maxWidth: "140px",
                        minWidth: "250px",
                        }}
                        src={data && data.usersById.photo}
                        alt="Profile Picture"
                    />
                 </Box>
             </Box>
             
             <Box sx={{ 
                 padding: "5%",
                 display:"flex",
                 flexDirection : "column",
                 gap : "5vh",
              }}>
                  <Box sx={{ 
                      display:"flex",
                      flexDirection : "row",
                      gap : "5%",
                      justifyContent :"flex-start",
                   }}>
                       <Box sx={{ 
                           width: "50%",
                           display:"flex",
                           flexDirection : "column",
                            gap : "5vh",                            
                        }}>
                            <CustomParagraph content="Name" />
                            <CustomParagraph content="Birthday" />
                            <CustomParagraph content="Email" />
                            <CustomParagraph content="Gender" />
                            <CustomParagraph content="Address" />
                            <CustomParagraph content="Phone Number" />
                            
                       </Box>
                       <Box sx={{ 
                           width: "50%",
                           display:"flex",
                           flexDirection : "column",
                            gap : "5vh",
                        }}>
                            <CustomParagraph content={data && data.usersById.name} />
                            <CustomParagraph content={data && data.usersById.birth_date} />
                            <CustomParagraph content={data && data.usersById.email} />
                            <CustomParagraph content={data && data.usersById.gender} />
                            <CustomParagraph content={data && data.usersById.address}/>
                            <CustomParagraph content={data && data.usersById.phone_number} /> 
                       </Box>
                       
                  </Box>
                  <Box sx={{ 
                      display:"flex",
                      flexDirection: "row", 
                   }}>
                      <Box sx={{ 
                          width:"50%"
                       }}>
                      <CustomButtonSecondary width="30%" caption="EDIT" OnClick={goEdit}/>
                      </Box>
                      <Box sx={{ 
                          width:"50%",
                          textAlign:"end"
                       }}>
                      <CustomButtonPrimary width="30%" caption="DELETE"/>
                      </Box>
                       {console.log(data)}
                  </Box>

             </Box>

        </Box>
        <Footer/>
    </Box>
    )
}

export default Profile