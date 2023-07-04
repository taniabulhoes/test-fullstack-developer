'use client'

import styled from "styled-components";


export const Container = styled.li`
    position: relative;


    .taskItemHeader{
        min-height:40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 4px;
        width: 100%;
        text-align: left;

        h1{
            cursor: pointer;
            width: 100%;
            padding: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

        }

        menu {
            display: flex;
            flex-direction: row;
            gap: 4px;
            width: 120px;
            li {
                .icon{
                    height: 1.5em;
                    width: 1.5em;
                    border: 1.5px solid transparent;
                    border-radius: 50%;
                    &:hover{
                        cursor: pointer;
                        border: 1.5px solid #fff;
                    }
                }
            }
        }
    }


`

export const TaskDescription = styled.div`
        p {
            word-wrap: break-word;
            text-align: left;
            padding: 6px;
        }
        .arrowContainter{
            border-bottom: 2px solid #070707;
            height: 10px;
            padding-top: 10px;
            cursor: pointer;
        
            .extended{
                transform: rotateX(180deg);
                color: #070707;
                bottom: -5px;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #000;
            }
        }
`
 



