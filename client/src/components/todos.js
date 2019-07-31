import React from 'react';
import axios from 'axios';
import { Col, Container } from 'react-bootstrap';
import Todo from './todo';

export default class todos extends React.Component {

    constructor(props) 
    {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            newTodo: event.target.value
        })
        console.log('something else');
    }

    addTodo()
    {
        axios.post('/addTodo', {nombre: this.state.newTodo} )
        .then(res => {
            this.getTodos();
        })
    }

    updateTodo(nombreParam, idParam)
    {
        axios.post('/updateTodo', {nombre: nombreParam, id: idParam} )
        .then(res => {
            this.getTodos();
        })
    }

    deleteTodo(idParam)
    {
        axios.post('/deleteTodo', {id: idParam} )
        .then(res => {
            this.getTodos();
        })
    }

    getTodos()
    {
        axios.get('/consultaTodos')
        .then(res => {
            this.setState({todos : res.data});
        })
    }

    componentDidMount()
    {
        this.getTodos();
    }

    state = {
        todos: [],
        newTodo: '',
        idEdit: '',
        nombreEdit: '',
        display: {display: 'none'}
    }

    render()
    {
        return(
            <div>
                <Container>
                    <Col xs = {12} sm = {6} md = {6}>
                        <br />
                        <h2 className = "jumbotron">
                            Gift List For Santa!
                            <br /><br />
                            <img src = {require('../img/santa-2.gif')} />
                        </h2>
                    </Col>
                    <Col xs = {12} sm = {6} md = {6}> 
                        <br />
                        <div className = 'input-group mb-3'>
                            <input type = "text" className = 'form-control' value = {this.state.newTodo} onChange = {e => this.handleChange(e)} /> &nbsp;
                            <div className = "input-group-append">
                            <button className = "btn btn-danger" type = "button"  onClick={ () => this.addTodo() } > Add Todo </button>
                            </div>
                        </div>
                        <br />
                        <ul className = "list-group">
                            {
                                this.state.todos.map((item, index) =>
                                    <li className = "list-group-item list-group-item-action"> 
                                        <div className = "element">
                                            <Todo todos = {this.state} getTodos = { this.getTodos } updateTodo = { this.updateTodo } deleteTodo = { this.deleteTodo } nombre = {item.nombre} id = {item.id} />
                                        </div> 
                                    </li>
                            )}
                        </ul>
                    </Col>
                </Container>
            </div>
        );
    }
}
