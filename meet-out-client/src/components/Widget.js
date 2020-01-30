import React from 'react'
import { Button, Container } from 'reactstrap'
import cloudinary from 'cloudinary-core'


const Widget = props => {
    
    let options = {
        cloud_name: "demo",
        upload_preset: "a5vxnzbp",
        multiple: true,
        returnJustUrl: true
    };
    
    // let widget = cloudinary.createUploadWidget({ 
    //     cloudName: process.env.CLOUDINARY_CLOUD_NAME, uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET_NAME }, 
    //     (error, result) => {
    //         console.log('Error', error)
    //         checkUploadResult(result)
    //     });

    // const checkUploadResult = (resultEvent) => {
    //     if (resultEvent === 'success') {
    //         console.log(resultEvent.info.secure_url)
    //     }
    // }

    // const showWidget = (widget) => {
    //     widget.open()
    // }


    // ReactCloudinaryUploader.open(options)
    // .then(image => {
    //     if (this.props.returnJustUrl)
    //         image = image.url;
    //     console.log("image",image);
    // })
    // .catch(err => {
    //     console.error(err);
    // })

    return (
        <Container className="web-body">
            <Button onClick={showWidget(widget)}>
            <ReactCloudinaryUploader
                cloudName='appmasters-io'
                uploadPreset='willim-dev'
                onUploadSuccess={(image)=>{
                    console.log("image",image);
                }}
            />
            </Button>
        </Container>
    )
}

export default Widget