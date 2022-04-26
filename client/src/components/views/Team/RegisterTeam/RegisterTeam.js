import { Form, Input, Button } from 'antd'
import React, { useState } from 'react'
import EmblemUpload from '../../../utils/EmblemUpload'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTeam } from '../../../../_actions/user_actions';

const { TextArea } = Input;

function RegisterTeam(props) {
    const [Name, setName] = useState("")
    const [Ticker, setTicker] = useState("")
    const [Emblem, setEmblem] = useState("")
    const [Description, setDescription] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateEmblem = (newEmblem) => {
        setEmblem(newEmblem)
    }

    const nameChangeHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const tickerChangeHandler = (event) => {
        setTicker(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Name || !Ticker || !Emblem) {
            return alert("팀 설명을 제외한 모든 값을 넣어주셔야 합니다.")
        }

        const body = {
            owner: props.user.userData._id,
            name: Name,
            ticker: Ticker,
            emblem: Emblem.filePath,
            description: Description,
            member: props.user.userData._id
        }

        axios.post("/api/teams", body)
            .then(response => {
                console.log(response.data)
                if(response.data.success) {
                    // dispatch(addTeam(body))
                    alert('팀이 등록 되었습니다.')
                    navigate('/')
                } else {
                    alert('팀 등록에 실패하였습니다.')
                    return;
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>팀 등록</h2>
            </div>

            <Form onSubmitCapture={submitHandler}>
                <EmblemUpload refreshFunction={updateEmblem} />
            
            <br />
            <br />
            <label>팀명</label>
            <Input onChange={nameChangeHandler} value={Name} />

            <br />
            <br />
            <label>Ticker</label>
            <Input onChange={tickerChangeHandler} value={Ticker} />

            <br />
            <br />
            <label>팀 설명</label>
            <TextArea onChange={descriptionChangeHandler} value={Description} />
            <br />
            <br />
            <Button htmlType="submit">
                팀생성
            </Button>

            </Form>
        </div>
    )
}

export default RegisterTeam