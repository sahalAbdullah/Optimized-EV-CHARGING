import React from 'react';
import {SvgXml} from 'react-native-svg';

const xml: string = `
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.75 13.75C1.3375 13.75 0.984375 13.6031 0.690625 13.3094C0.396875 13.0156 0.25 12.6625 0.25 12.25V1.75C0.25 1.3375 0.396875 0.984375 0.690625 0.690625C0.984375 0.396875 1.3375 0.25 1.75 0.25H7V1.75H1.75V12.25H7V13.75H1.75ZM10 10.75L8.96875 9.6625L10.8813 7.75H4.75V6.25H10.8813L8.96875 4.3375L10 3.25L13.75 7L10 10.75Z" fill="#FF4D49"/>
</svg>

`;

export default (props: {width: number; height: number}) => (
  <SvgXml xml={xml} width={props.width} height={props.height} />
);
