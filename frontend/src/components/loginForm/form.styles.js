'use client'

import styled from "styled-components";

export const FormContainer = styled.div`

    background-color: #F4F1ED;
    color: rgb(152, 146, 137);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.15) 15px 20px 25px 0px;
    margin: 5% auto;

    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        width: 100%;
        padding: 10%;
        margin: 0 auto;

        h1 > { 
            font-size: 1.1em;
        }
    
        h2> {
            margin-bottom: 5px;
        }

    }


    .inputContainer{
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #4C696F;
        color: #070707;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        &:focus-within {
            border: 1px solid #000
        }

        input {
            outline: none;
            width: 100%;
            height: 38px;
            background: transparent;
            align-items: center;
            flex: 1;
            border: 0;
            color: #070707;
            &::placeholder {
                color: rgb(152, 146, 137);
                font-size: 0.8rem;
            }
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
            -webkit-text-fill-color: #070707;
            -webkit-box-shadow: none;
            transition: background-color 86400s;
        }

        svg {
            color: #4C696F;
            &:hover {
                cursor: pointer;
                filter: brightness(60%);
            }
        }
    }

    button{
        color: #f3f3f3;
        font-size: 1.1em;
        height: 40px;
        width: 100%;
        border-color: #F4F1ED;
        background-color: #4C696F;
        border: 1px solid #669156;
        border-radius: 4px;
        padding: 10px;

        &:hover {
            cursor: pointer;
            filter: brightness(90%);
        }
    } 

    .erroContainer{
        width: 100%;
        color: red;
        text-align: center;
        font-size: 12px;
    }    


`