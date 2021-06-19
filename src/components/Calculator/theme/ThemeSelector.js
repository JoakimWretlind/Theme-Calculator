import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from 'lodash';
import { useTheme } from './useTheme';
import { getFromLS } from "./storage";
import { FaTimes } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";;

const Container = styled.ul`
    position: absolute; 
    width: 100%;    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: linear-gradient(-35deg, #F5F7FA,#959EAA);
    box-shadow: 0 .3rem .6rem rgba(0,0,0,.4);
`;

const Wrapper = styled.li`
    height: 6rem;
    width: 20rem;
    text-align: center;
    border-radius: .1rem;
    list-style: none;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 .2rem .4rem rgba(0,0,0,.3);
    transition: .3s ease-in-out;
    cursor: pointer;
      &:hover{
          box-shadow: none;
      }
`;

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    border-radius: .1rem;
    width: 100%;
    max-width: 10rem;
    cursor: pointer;
`;

const CalcIcon = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 1.2rem;
  display: flex;
  font-size: 2.6rem;
  color: #333;
  cursor: pointer;
  background: #f1f1f1;
  @media screen and (min-width: 415px){
      top: 5rem;
      right: 5rem;
  }
`;

const SetIcon = styled.div`
    position: fixed;
    right: 2rem;
    top: 2rem;
    padding: .1rem;
    display: flex;
    font-size: 2.6rem;
    color: #fff;
    cursor: pointer;
    background: #000;  
    border-radius: 1rem;
    transition: .3s ease-out;
    &:hover {
        background: #666;
     }
    @media screen and (min-width: 415px){
      width: 4.6rem;
      top: 20%;
      left: calc(50% + 15rem);
      padding: 1rem;
  }
`;

export default (props) => {
    const themesFromStore = getFromLS('all-themes');
    const [data, setData] = useState(themesFromStore.data);
    const [themes, setThemes] = useState([]);
    const { setMode } = useTheme();
    const [menu, setMenu] = useState(false)

    const themeSwitcher = selectedTheme => {
        console.log(selectedTheme);
        setMode(selectedTheme);
        props.setter(selectedTheme);
    };

    useEffect(() => {
        setThemes(_.keys(data));
    }, [data]);

    useEffect(() => {
        props.newTheme &&
            updateThemeCard(props.newTheme);
    }, [props.newTheme])

    const updateThemeCard = theme => {
        const key = _.keys(theme)[0];
        const updated = { ...data, [key]: theme[key] };
        setData(updated);
    }

    const handleSettingsClick = () => setMenu(!menu)

    const ThemeCard = props => {
        return (
            <Wrapper onClick={(theme) => themeSwitcher(props.theme)} style={{
                backgroundColor: `${data[_.camelCase(props.theme.name)].background}`,
                color: `${data[_.camelCase(props.theme.name)].colors.text}`,
                fontFamily: `${data[_.camelCase(props.theme.name)].font}`
            }}>
                <ThemedButton onClick={(theme) => themeSwitcher(props.theme)}
                    style={{
                        backgroundColor: `${data[_.camelCase(props.theme.name)].button.background}`,
                        color: `${data[_.camelCase(props.theme.name)].button.text}`,
                        fontFamily: `${data[_.camelCase(props.theme.name)].font}`
                    }}>
                    {props.theme.name}
                </ThemedButton>
            </Wrapper>
        )
    }

    return (
        <div>
            <SetIcon onClick={handleSettingsClick}>{menu ? <FaTimes /> : <IoSettingsSharp />}</SetIcon>
            <Container style={{ top: menu ? 0 : "-100%", transition: ".7s ease-out" }}>
                <CalcIcon onClick={handleSettingsClick}>
                    {menu ? <FaTimes /> : <IoSettingsSharp />}
                </CalcIcon>
                {
                    themes.length > 0 &&
                    themes.map(theme => (
                        <ThemeCard theme={data[theme]} key={data[theme].id} />
                    ))
                }
            </Container>
        </div>
    )
}