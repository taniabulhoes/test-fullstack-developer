'use client'

import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);  
  z-index: 1;  

  .modalWrapper{
    width: 500px;
    height: 600px; 
    
    .modal{
        background: white;
        height:100%;
        width:100%;
        border-radius: 8px;
        padding: 6px; 

        .modalHeader{
            display: flex;
            justify-content: space-between;
            svg{
              height: 1.3em;
              width: 1.3em;
              cursor: pointer;
            }
        }
    }

  }

`