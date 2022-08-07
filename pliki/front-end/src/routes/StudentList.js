import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import Container from "../components/Container";
import Button from "../components/Button";
import style from "../style/StudentList.module.scss";

class StudentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataStudent: [],
            group: ''
        }
    };
    componentDidMount = () => {
        this.listStudents();
    };
    listStudents = () => {
        axios.post('http://127.0.0.1:8080/api/user/all?group=' + this.state.group)
            .then(res => {
                this.setState({
                    dataStudent: res.data

                })
            })
    };
    render() {
        return (
            <Container>
                <div className={style.ListComponent}>
                    <select onChange={(e) => {
                        this.setState({ group: e.target.value }, () => {
                            this.listStudents();
                        })
                    }}>
                        <option value="">Wszyscy </option>
                        <option value="1a">1a</option>
                        <option value="1b">1b</option>
                        <option value="1c">1c</option>
                        <option value="2a">2a</option>
                        <option value="2b">2b</option>
                        <option value="2c">2c</option>
                        <option value="3a">3a</option>
                        <option value="3b">3b</option>
                        <option value="3c">3c</option>
                        <option value="4a">4a</option>
                        <option value="4b">4b</option>
                        <option value="4c">4c</option>
                    </select>
                    <List dataStudents={this.state.dataStudent} dataStudent={this.listStudents} />
                </div>
            </Container>
        )
    }
}
export default StudentList