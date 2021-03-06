import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        users {
            id
            name
            email
            password
            birth_date
            phone_number
            photo
            gender
            address
        }
    }
`;

export const GET_LOGIN = gql`
    query ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            code
            token
            id_user
        }
    }
`;

export const SET_REGISTER = gql`
mutation ($name: String!, $email: String!, $password: String!) {
    createUser(input: {name: $name, email: $email, password: $password}){
        id
        name
    }
  }
`;

export const GET_PROFILE = gql`
    query ($id: Int!){
        usersById(id: $id) {
            id
            name
            email
            password
            birth_date
            phone_number
            photo
            gender
            address
        }
    }
`;

export const EDIT_PROFILE = gql`
    mutation ($name: String!, $email: String!, $password: String!, $gender: String!, $birth_date: String!, $phone_number: String!, $photo: String!, $address: String!, $id: Int!){
        updateUser(input: {
            name: $name, 
            email: $email, 
            password: $password, 
            gender: $gender,
            birth_date: $birth_date,
            phone_number: $phone_number,
            photo: $photo,
            address: $address
            }, id: $id){
            code
            message
        }
    }
`;

export const POST_COMMENT = gql`
    mutation ($id_event: Int!, $id_user: Int!, $comment: String!){
        createComment(input: {id_event: $id_event, id_user: $id_user, comment: $comment}){
            comment
        }
    }
`;

export const GET_COMMENT = gql`
    query ($id_event: Int!) {
        comments(id_event: $id_event) {
            id
            id_event
            id_user
            comment
            name
            email
            photo
            created_at
        }
    }
`;

export const DELETE_PROFILE = gql`
    mutation ($id: Int!){
        deleteUserByID(id: $id){
            code
            message
        }
    }
`;

export const JOIN_EVENT = gql`
    mutation ($id_event: Int!, $id_user: Int!){
        createParticipant(input: {id_event: $id_event, id_user: $id_user}){
            id_event
            id_user
        }
    }
`;

export const GET_EVENT = gql`
    query($offset: Int!){
        events(offset: $offset, limit: 10){
            id
            id_user
            id_category
            title
            start_date
            end_date
            location
            details
            photo
        }
    }
`;


export const CREATE_EVENT = gql`
mutation (
        $id_category: Int!,
        $title: String!,
        $start_date: String!,
        $end_date: String!,
        $location: String!,
        $details: String!,
        $photo: String!
    ){
    createEvent(
        input:{
            id_category: $id_category,
            title: $title,
            start_date: $start_date,
            end_date: $end_date,
            location: $location,
            details: $details,
            photo: $photo
        }
    ){
        id_user
        id_category
        title
        start_date
        end_date
        location
        details
        photo
    }
}
`;

export const DELETE_EVENT = gql`
    mutation($id: Int!){
        deleteEventByID(id:$id){
            code 
            message
        }
    }
`;

export const GET_EVENT_DETAILS = gql`
    query ($id: Int!){
        eventsById (id:$id){
            id
            id_user
            id_category
            title
            start_date
            end_date
            location
            details
            photo
            comments{id,id_event,id_user,comment,name,email,photo}
            participant{id,id_event,id_user,name,email,photo}
        }
    }
`;

export const GET_CATEGORY = gql`
    query {
        category {
            id
            description
        }
    }
`;

export const GET_MYEVENT = gql`
query ($id:Int!) {
    myEvent(id_user: $id){
        id
        id_user
        id_category
        title
        start_date
        end_date
        location
        details
        photo
        created_at
        updated_at
        deleted_at
    }
}`

export const UPDATE_EVENT = gql`
mutation ($id_category: Int!,
    $title: String!,
    $start_date: String!,
    $end_date: String!,
    $location: String!,
    $details: String!,
    $photo: String!,
    $id: Int!
    ){
    updateEvent(
        input:{
            id_category: $id_category,
            title: $title,
            start_date: $start_date,
            end_date: $end_date,
            location: $location,
            details: $details,
            photo: $photo
        }, id:$id
    ){
        code
        message
    }
}
`;

export const GET_PARTICIPANT = gql`
    query ($id_event: Int!){
        participants(id_event: $id_event){
            id
            id_event
            id_user
            name
            email
            photo
            created_at
        }
    }
`;
export const GET_SEARCH =gql`
query($search: String!) {
    eventSearch(title: $search){
        id
        id_user
        id_category
        title
        start_date
        end_date
        location
        details
        photo
        created_at
        updated_at
        deleted_at
    }
}`

export const GET_HISTORY=gql`
query($id: Int!) {
    eventHistory(id_user: $id){
        id
        id_user
        id_category
        title
        start_date
        end_date
        location
        details
        photo
        created_at
        updated_at
        deleted_at
    }
}`

export const GET_PAGINATION= gql`
query {
    eventsPagination(offset: 0, limit: 10){
        total_page
        data{
            id
            id_user
            id_category
            title
            start_date
            end_date
            location
            details
            photo
            created_at
            updated_at
            deleted_at
        }
    }
}`

export const GET_BYCATEGORY= gql`
query($idCategory : Int!){
    eventsByCategory(id_category: $idCategory, limit: 10, offset: 0){
        id
        id_user
        id_category
        title
        start_date
        end_date
        location
        details
        photo
    }
}`

export const GET_EVENT_AND_CATEGORY=gql`
    query($id: Int!){
        eventsById (id:$id){
            id
            id_user
            id_category
            title
            start_date
            end_date
            location
            details
            photo
            comments{id,id_event,id_user,comment,name,email,photo}
            participant{id,id_event,id_user,name,email,photo}
        }
        category {
        id
        description
        }
    }
`;