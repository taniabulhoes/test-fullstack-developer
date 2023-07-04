'use client'

import styled from "styled-components";

export const Container = styled.header`
    width: 100%;
    height: 100px;
    background: #F4F1ED;

    -webkit-box-shadow: 0px 4px 5px -1px rgba(0,0,0,0.35);
    -moz-box-shadow: 0px 4px 5px -1px rgba(0,0,0,0.35);
    box-shadow: 0px 4px 5px -1px rgba(0,0,0,0.35);
`

export const Content = styled.div`
    width: 100%;
    max-width: 1100px;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    button{
        height: 40px;
        padding: 10px;
        width: 150px;
        font-size: 1.1em;
        color: #F4F1ED;
        background-color: #4C696F;
        box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
        border: none;
        border-radius: 4px;

        &:hover {
            cursor: pointer;
            filter: brightness(90%);
        }
    }    
`

export const Logo = styled.div`
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    p{
        font-size: 32px;
        font-weight: bolder;
        color: #4C696F;
        padding: 0; 
    }
`

