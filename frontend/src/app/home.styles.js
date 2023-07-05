'use client'

import styled from "styled-components";

export const Main = styled.main`
    width: 100vw;
    height: 100vh;
`

export const Container = styled.div`
    width: 100%;
    min-height: calc(100% - 100px);
    padding-top: 6px;
    padding-bottom: 2px;

`

export const Content = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 550px; 
    height: 100%;
    margin: 0 auto;
    padding: 6px;
    border-radius:4px;
    background-color: #F4F1ED;


    display: flex;
    flex-direction: column;
    text-align: center;
    row-gap: 10px;
    .contentHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1  { 
            font-size: 1.3em;
        }

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

    }

    input{
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
        height: 40px;
        border: 1px solid #4C696F;
        outline: none;

        &::placeholder{
            color: rgb(152, 146, 137);
        }
    }

    menu {
        list-style-type: none;
        display: flex;
        margin: 0;
        justify-content: space-between;
        li {
            width: 30%;
            button{
                transition: 0.3s ease;
                color: #000;
                height: 40px;
                background-color: #F4F1ED;
                border: none;
                border-radius: 2px;
                padding: 10px;
                width: 100%;

                &:hover {
                    cursor: pointer;
                    filter: brightness(98%);
                    transform: translateY(-6px)
                }

            } 

            .open{
                border-bottom: 1px solid #83AAA3;
            }
            .closed{
                border-bottom: 1px solid #c27f7f;
            }
            .running{
                border-bottom: 1px solid #ffb74d;                
            }         
               
            .selected{
                transform: translateY(-6px)
            }
        }
    }

`

export const TaskList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 15px;     
    min-height: calc(100% - 100px);
    padding-bottom: 10px;
    .open{
        background: #83AAA3;

        .arrow{
         color: #83AAA3;     
        }
    }
    .closed{
        background-color: #c27f7f;
        h1{
            text-decoration: line-through;
        }
        .arrow{
         color: #c27f7f;     
        }
    }
    .running{
        background-color: #ffb74d;
        .arrow{
         color: #ffb74d;     
        }
    }

    .arrow{
        position: absolute;
        left: calc(50% - 20px);
        height: 24px;
        width: 34px;
        bottom: -16px;
    }


`

