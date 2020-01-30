import React from 'react'
import { Button, Container } from 'reactstrap'
import cloudinary from 'cloudinary-core'


const Widget = props => {
    
    let widget = cloudinary.createUploadWidget({ 
        cloudName: process.env.CLOUDINARY_CLOUD_NAME, uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET_NAME }, 
        (error, result) => {
            console.log('Error', error)
            checkUploadResult(result)
        });

    const checkUploadResult = (resultEvent) => {
        if (resultEvent === 'success') {
            console.log(resultEvent.info.secure_url)
        }
    }

    const showWidget = (widget) => {
        widget.open()
    }

    return (
        <Container className="web-body">
            <Button onClick={showWidget(widget)}>
                Upload Photo
            </Button>
        </Container>
    )
}

export default Widget