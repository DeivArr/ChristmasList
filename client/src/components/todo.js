import React from 'react';

export default class todos extends React.Component {
    constructor(props) 
    {
        super(props);
        this.handleText = this.handleText.bind(this);
    }
    
    state = {
        nombreEdit: '',
        inputVisibility: {display: 'none'},
        textVisibility: {display: 'block'}
    }

    handleText(event)
    {
        console.log('DEFAULT VALUE' + event.target.value);

        this.setState({
            nombreEdit: event.target.value
        });
    }

    handleKeyPress = (event) =>
    {
        if(event.key === 'Enter')
        {
            

            this.props.updateTodo(this.state.nombreEdit, this.state.idEdit);

            this.setState({
                inputVisibility: { display: 'none'},
                textVisibility: {display: 'block'}
            });
        }
    }

    startEdition(nombre, id)
    {
        this.setState({
            idEdit: id,
            nombreEdit: nombre,
            inputVisibility: { display: 'block'},
            textVisibility: {display: 'none'}
        });
    }

    render()
    {
        const  { nombre, id } = this.props;

        return(
            <div className = "whole">
                <div className = "half">
                    <span style = {this.state.textVisibility} >{nombre}</span> 
                    <input type = "text" style = {this.state.inputVisibility} onChange = {this.handleText} onKeyPress = { this.handleKeyPress } id = {this.state.idEdit} defaultValue = { this.state.nombreEdit } />
                </div>
                <div className = "secondHalf">
                    <i onClick={ () => this.startEdition(nombre, id) } class="fa fa-pencil" aria-hidden="true"></i> 
                    &nbsp;
                    <i onClick={ () => this.props.deleteTodo(id) } class="fa fa-times" aria-hidden="true"></i> 
                </div>
            </div>
        );
    }
}
