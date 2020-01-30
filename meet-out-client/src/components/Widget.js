import React from 'react'
import { Button, Container } from 'reactstrap'
import cloudinary from 'cloudinary-core'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


class Widget extends React.Component = props => {
    // let options = {
    //     cloud_name: "demo",
    //     upload_preset: "a5vxnzbp",
    //     multiple: true,
    //     returnJustUrl: true
    // };
    
    checkUploadResult = (resultEvent) => {
        if (resultEvent === 'success') {
            console.log(resultEvent.info.secure_url)
        }
    }

    showWidget = (widget) => {
        console.log('Upload was clicked')
        widget.open()
    }

    // ReactCloudinaryUploader.open(options)
    // .then(image => {
    //     if (this.props.returnJustUrl)
    //         image = image.url;
    //     console.log("image",image);
    // })
    // .catch(err => {
    //     console.error(err);
    // })

    render() {
        let widget = window.cloudinary.createUploadWidget({ 
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET_NAME }, 
            (error, result) => {
                console.log('Error', error)
                checkUploadResult(result)
        })

        return (
        <Container className="web-body">
            <Button onClick={showWidget(widget)}>
                Upload Image
            </Button>
        </Container>
        )
    }
}

export default Widget