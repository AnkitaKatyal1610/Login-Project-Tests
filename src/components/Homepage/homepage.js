import React, { Component } from 'react'
import { Button, Table, Image, Pagination, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { logoutAction } from '../../action/action'
import { getUsersAction } from '../../action/userActions'

export class Homepage extends Component {
    state = {
        page: 1
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if (this.props.token === '' && !token) {
            this.props.history.replace('/login');
        }
        if (this.props.getUsersAction)
            this.props.getUsersAction(this.state.page);

    }
    logoutClicked = () => {
        if (this.props.logoutAction) {
            this.props.logoutAction();
            this.props.history.replace('/login');
        }
    }

    setPageNum = (e, data) => {
        this.setState({ page: data.activePage });
        this.props.getUsersAction(data.activePage);
    }

    render() {
        return (
            <div>
                <h2>Welcome, you have logged in successfully</h2>{" "}
                <Button onClick={this.logoutClicked} color='orange'>Logout</Button>
                <Table textAlign='center' inverted>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Avatar</Table.HeaderCell>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            (!this.props.users) ? null : this.props.users.map((user, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell>{i + 1 + (this.state.page - 1) * 3}</Table.Cell>
                                        <Table.Cell><Image centered src={user.avatar} size='mini' circular /></Table.Cell>
                                        <Table.Cell>{user.first_name}</Table.Cell>
                                        <Table.Cell>{user.last_name}</Table.Cell>
                                        <Table.Cell><Button color='blue'>Edit</Button><Button color='red'>Delete</Button></Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <Pagination defaultActivePage={this.state.page} onPageChange={this.setPageNum}
                    totalPages={4} prevItem={{ content: <Icon name="angle left" size='small' />, icon: true }}
                    nextItem={{ content: <Icon name="angle right" size='small' />, icon: true }}
                    firstItem={{ content: <Icon name="caret left" size='small' />, icon: true }}
                    lastItem={{ content: <Icon name="caret right" size='small' />, icon: true }} />
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        token: state.auth.token,
        users: state.user.users
    }
}
const mapDispatch = (dispatch) => {
    return {
        logoutAction: bindActionCreators(logoutAction, dispatch),
        getUsersAction: bindActionCreators(getUsersAction, dispatch)
    }
}
export default withRouter(connect(mapState, mapDispatch)(Homepage))