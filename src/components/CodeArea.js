import React, { Component } from 'react';
import js_beautify from "js-beautify";
import styled from "styled-components";

const CodeTextArea = styled.textarea`
  font-family: IBM Plex Mono;
  background-color: #081227;
  color: #D8B8A1;
  border-color: #0F0600;
  border-radius: 2px;
  resize: none;
`;

const CodeTitle = styled.h3`
    color: #6F7A90;
    margin-top: 2px;
    margin-bottom: 2px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
`;

const ToggleVisButton = styled.button`
    background-color: #081227;
    color: #96B98A;
    font-size: 1.5em;
    border-color: #0F0600;
`;

export default class CodeArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeVisible: props.startVisible || false,
        };
    }

    toggle = () => {
        this.setState({
            codeVisible: !this.state.codeVisible
        });
    }

    getCode = () => {
        return this.refs["textAreaCode"].value;
    }

    render() {
        console.log(this.props.code.name);
        return (
            <div>
                <Row>
                    <ToggleVisButton onClick={this.toggle}>
                        { this.state.codeVisible ? '-' : '+' }
                    </ToggleVisButton>
                    <CodeTitle>{this.props.code.name}</CodeTitle>
                </Row>
                { this.state.codeVisible && <CodeTextArea
                    ref="textAreaCode"
                    rows="4"
                    cols="60"
                    defaultValue={
                        js_beautify(
                            this.props.code.toString(), {
                            wrap_line_length: 60,
                            break_chained_methods: true,
                            brace_style: "collapse",
                    })}
                    { ...this.props }
                /> }
            </div>
        )
    }
}
