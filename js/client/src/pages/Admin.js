import React,{useState,useEffect}from 'react';
import { Button, Container,Table,Form } from 'react-bootstrap';
import '../css/Admin.css'
import CreateFlat from '../components/Modals/CreateFlat';
import { fetchFeedback,deleteFeedback } from '../http/feedbackAPI';
import { deleteApplication, fetchApplication,updateApplication } from '../http/applicationAPI';
import { deleteFlatsale, fetchFlatsale } from '../http/flatsaleAPI';
import { fetchUsers,deleteUser,changeUserRole } from '../http/userAPI';
const Admin = () => {
    const [flatVisible,setFlatVisible]=useState(false)
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const [applicationData,setApplicationData]= useState([]);
    const [applicationVisible,setApplicationVisible]=useState(false);
    const [statusUpdate, setStatusUpdate] = useState({ id: '', status: '' });
    const [flatsaleVisible, setFlatsaleVisible] = useState(false);
    const [flatsaleData,setFlatsaleData]=useState([]);
    const [userVisible,setUserVisible]=useState(false);
    const [users, setUsers] = useState([]);
    const [roleUpdate, setRoleUpdate] = useState({ id: '', role: '' });
    const loadFeedback = async () => {
        const data = await fetchFeedback();
        setFeedbackData(data);
    };
    const loadApplication = async () =>{
        const data = await fetchApplication();
        setApplicationData(data);
    }
    const loadUsers = async ()=>{
        const data = await fetchUsers();
        setUsers(data);
    }
    const loadFlatsale = async ()=>{
        const data = await fetchFlatsale();
        setFlatsaleData(data);
    }
    const handleDeleteApplication = async(id)=>{
        await deleteApplication(id);
        setApplicationData(applicationData.filter(application=>application.id !== id));
    };
    const handleDeleteFlatsale = async(id)=>{
        await deleteFlatsale(id);
        setFlatsaleData(flatsaleData.filter(flatsale=>flatsale.id !== id));
    }
    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };
    const handleUpdateApplicationStatus = async (id, status) => {
        try {
            await updateApplication(id, { status });
            setApplicationData(applicationData.map(app => (app.id === id ? { ...app, status } : app)));
        } catch (error) {
            console.error('Error updating application status:', error);
        }
    };
    const handleChangeUserRole = async (id, role) => {
        await changeUserRole(id, role);
        setUsers(users.map(user => (user.id === id ? { ...user, role } : user)));
    };


    const handleDeleteFeedback = async (id) => {
        try {
            await deleteFeedback(id);
            setFeedbackData(feedbackData.filter(feedback => feedback.id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    useEffect(() => {
        if (feedbackVisible) {
            loadFeedback();
        }
    }, [feedbackVisible]);
    useEffect(() => {
        if (applicationVisible) {
            loadApplication();
        }
    }, [applicationVisible]);
    useEffect(()=>{
        if (flatsaleVisible){
            loadFlatsale();
        }
    },[flatsaleVisible]);
    useEffect(()=>{
        if (userVisible){
            loadUsers();
            }
            },[userVisible]);
    return (
       <Container>
           <Container className='d-flex flex-row justify-content-center'>
             
           <Button className='mt-3 me-3' onClick={()=> setFlatVisible(true)}>Добавить квартиру</Button>
           <Button className='mt-3 me-3' onClick={() => setFeedbackVisible(!feedbackVisible)}>Просмотреть отзывы</Button>
           <Button className='mt-3 me-3' onClick={() => setApplicationVisible(!applicationVisible)}>Просмотреть заявки на покупку</Button>
           <Button className='mt-3 me-3' onClick={()=>setFlatsaleVisible(!flatsaleVisible)}>Просмотреть заявки на продажу</Button>
           <Button className='mt-3 me-3' onClick={()=>setUserVisible(!userVisible)}>Пользователи</Button>
            <CreateFlat show={flatVisible} onHide={()=> setFlatVisible(false)} />
            </Container>
            {feedbackVisible && (
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Отзыв</th>
                            <th>UserID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackData.map(feedback => (
                            <tr key={feedback.id}>
                                <td>{feedback.id}</td>
                                <td>{feedback.feedback}</td>
                                <td>{feedback.userId}</td>
                                <td>
                                    <Button variant='danger' onClick={() => handleDeleteFeedback(feedback.id)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
             {applicationVisible && (
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Статус</th>
                            <th>UserID</th>
                            <th>FlatID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicationData.map(application => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        value={statusUpdate.id === application.id ? statusUpdate.status : application.status}
                                        onChange={(e) => setStatusUpdate({ id: application.id, status: e.target.value })}
                                    />
                                </td>
                                <td>{application.userId}</td>
                                <td>{application.flatId}</td>
                                <td>
                                    <Button variant='primary' onClick={() => handleUpdateApplicationStatus(application.id, statusUpdate.status)}>Обновить</Button>
                                    <Button variant='danger' onClick={() => handleDeleteApplication(application.id)} className="ms-2">Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {flatsaleVisible && (
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Улица</th>
                            <th>Номер дома</th>
                            <th>Кол-во комнат</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flatsaleData.map(flatsale => (
                            <tr key={flatsale.id}>
                                <td>{flatsale.id}</td>
                                <td>{flatsale.adres}</td>
                                <td>{flatsale.number_house}</td>
                                <td>{flatsale.rooms}</td>
                                <td>{flatsale.name}</td>
                                <td>{flatsale.email}</td>
                                <td>{flatsale.number}</td>
                                <td>
                                    <Button variant='danger' onClick={() => handleDeleteFlatsale(flatsale.id)}>Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {userVisible && (
                <Table striped bordered hover className='mt-3'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Фамилия</th>
                            <th>Номер</th>
                            <th>Роль</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.famname}</td>
                                <td>{user.number}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        value={roleUpdate.id === user.id ? roleUpdate.role : user.role}
                                        onChange={(e) => setRoleUpdate({ id: user.id, role: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => handleChangeUserRole(user.id, roleUpdate.role)}>Изменить роль</Button>
                                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)} className="ms-2">Удалить</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            </Container>
          
     
    );
};

export default Admin;