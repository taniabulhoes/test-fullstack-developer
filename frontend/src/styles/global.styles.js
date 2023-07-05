'use client'

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root{
}


body {
    background: #4C696F;
	overflow-x: hidden;
	height: 100vh;
	width: 100vw;
    margin: 0;
html {
	overflow-x: hidden;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-family: "Segoe UI", sans-serif;
	font-style: normal;
    font-weight: 400;
	font-size: 16px;
	vertical-align: baseline;
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

    .deleteModal{
        .modalWrapper{
            width: 100%;
            max-width: 350px; 
            height: 250px;
            padding:12px;
            .modal{
                background: #F4F1ED;
				.modalHeader{
					span{
						font-weight:bold;
					}
				}

                .modalBody{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 180px;
					text-align: center;
					padding-top: 30px;
					.actions {
						display: flex;
						justify-content:space-between;
						margin-top: auto;
					}
                    button{
                        color: #f3f3f3;
                        font-size: 1.1em;
                        height: 40px;
                        width: 100px;
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
                }

            }
        }
    }


	.updateModal{
		
		.modalWrapper{
            width: 100%;
            max-width: 350px; 
            height: 400px;
            padding:12px;			
		}
		.modalBody{
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

						input, textarea {
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

						textarea {
							resize: none;
							height: 120px;
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
				.actions {
					display: flex;
					justify-content:space-between;
					margin-top: auto;

					    button{
                        color: #f3f3f3;
                        font-size: 1.1em;
                        height: 40px;
                        width: 100px;
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
				}
					
			}
		}
	}

}
`;

export default GlobalStyle;