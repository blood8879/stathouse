import { Button, Icon } from 'antd';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios'

function EmblemUpload(props) {
    const [Emblem, setEmblem] = useState("")

    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0]);

        axios.post('/api/teams/emblem', formData, config)
            .then(response => {
                if(response.data.success) {
                    setEmblem(response.data.filePath)
                    props.refreshFunction(response.data)
                }
            })
    }


  
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div
                            style={{
                                width: 300, height: 240, border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize: '3rem' }} />
                        </div>
                    </section>
                )}
            </Dropzone>

            <div>
                {
                    Emblem === ""
                    ? null
                    : <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px'}} 
                        src={`http://localhost:8888/${Emblem}`} />
                        </div>
                }
            </div>
        </div>
    );
}

export default EmblemUpload