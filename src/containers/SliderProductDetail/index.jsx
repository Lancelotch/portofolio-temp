import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Row, Col, Modal } from "antd";
import PropTypes from "prop-types";
import Magnifier from "react-magnifier";
import "./style.sass";
import ButtonPlay from "../../components/ButtonPlay";

const PREFIX_URL = `https://raw.githubusercontent.com/putrairawan992/assets-monggopesen/master/ic_button_play.png`;

export default function SliderProductDetailContainer(props) {
    const [imagesToShow, setImagesToShow] = useState([])
    const [imagesWithDefault, setImagesWithDefault] = useState([])
    const [isImageVariantExist, setIsImageVariantExist] = useState(false)
    const [startIndex, setStartIndex] = useState(0)
    const [showGalleryVideo, setShowGalleryVideo] = useState(false)
    const isUpdateImageVariant = props.isUpdateImageVariant
    const imageVariant = props.imageVariant
    let refSlider = React.createRef();

    useEffect(() => {
        let imageDefault = props.imageDefault;
        let imagesProps = props.images;
        let imagesWithDefault = [];
        imagesProps.forEach(image => {
            if (image.isDefault !== true) {
                imagesWithDefault.unshift(image);
            }
        });
        imagesWithDefault.unshift(imageDefault);
        setImagesWithDefault([...imagesWithDefault])
        setImagesToShow([...imagesWithDefault])
    }, [])

    useEffect(() => {
        if (isUpdateImageVariant) {
            showImages(imageVariant);
        }
    }, [isUpdateImageVariant, imageVariant])

    function showImages(imageVariantProps = "") {
        let imagesToShow = [...imagesWithDefault];
        let isImageVariantExist = false;
        const imageVariant = { ...imageVariantProps };
        if (imageVariant.largeUrl !== undefined) {
            refSlider.slideToIndex(showThumbnail())
            imagesToShow.unshift(imageVariant);
            isImageVariantExist = true;
            setImagesToShow(imagesToShow)
            setIsImageVariantExist(isImageVariantExist)
            if (props.images.length >= 2) {
                setStartIndex(1)
            } else {
                setStartIndex(0)
            }
        }
    }

    function showThumbnail() {
        if (props.videoUrl) {
            return 1
        } else {
            return 0
        }
    }

    function removeThumbnailImageVariant() {
        const images = imagesToShow;
        const thumbnailDom = document.getElementsByClassName("image-gallery-thumbnail");
        const lenImagesToShowWihoutVariant = images.length - 1;
        if (thumbnailDom.length > lenImagesToShowWihoutVariant) {
            thumbnailDom[showThumbnail()].parentNode.removeChild(thumbnailDom[showThumbnail()]);
        }
    }

    function pauseVideo() {
        setShowGalleryVideo(false)
    }

    function changeSlide(i) {
        pauseVideo();
        setStartIndex(i)
    }

    function showHideVideo() {
        setShowGalleryVideo(!showGalleryVideo)
    }

    function itemVideo(item) {
        return (
            <div className='image-gallery-image'>
                {showGalleryVideo === true ?
                    <Modal
                        wrapClassName="modal-video-slider"
                        title=" "
                        visible={showGalleryVideo}
                        onCancel={showHideVideo}
                        centered>
                        <div className='video-wrapper'>
                            <iframe
                                title="video"
                                src={item.embedUrl}
                                frameBorder='0'
                                allowFullScreen
                                allow='autoplay; encrypted-media'
                            >
                            </iframe>

                        </div>
                    </Modal>
                    :
                    <span onClick={() => showHideVideo()}>
                        <ButtonPlay />
                        <img src={item.original} alt="" className="video-image" />
                        {/*item.description &&
              <span
                className='image-gallery-description'
                style={{ right: '0', left: 'initial' }}
              >
                {item.description}
            </span>*/}
                    </span>}
            </div>
        )
    }

    function imageHover(item) {
        return (
            <Magnifier
                zoomImgSrc={item.large}
                src={item.original}
                zoomFactor={0.5}
                mgShape={'square'}
                mgBorderWidth={0}
            />
        );
    }

    function imageSlide() {
        let imagesToShowSlider = [];
        imagesToShow.forEach(image => {
            imagesToShowSlider.push({
                original: image.mediumUrl,
                thumbnail: image.smallUrl
            })
        })
        return imagesToShowSlider
    }

    function imagesandVideoToShow() {
        let imagesandVideoToShow = []
        const images = props.images
        let originalSlider = images.find(image => image.isDefault === true).mediumUrl
        imagesandVideoToShow.push({
            thumbnail: PREFIX_URL,
            original: originalSlider,
            embedUrl: props.videoUrl,
            //description: 'Render custom slides within the gallery',
            renderItem: itemVideo
        })
        return imagesandVideoToShow.concat(imageSlide())
    }

    const { videoUrl } = props;
    isImageVariantExist && removeThumbnailImageVariant();
    let isShowNav = props.images.length > 4 ? true : false

    return (
        <Row>
            <Col md={24}>
                <ImageGallery
                    ref={slider => refSlider = slider}
                    items={videoUrl ? imagesandVideoToShow() : imageSlide()}
                    renderItem={imageHover}
                    onSlide={changeSlide}
                    startIndex={startIndex}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={isShowNav}
                    lazyLoad={true}
                    disableArrowKeys={true}
                />
            </Col>
        </Row>
    );

}

SliderProductDetailContainer.propTypes = {
    images: PropTypes.arrayOf(Object),
    imageVariant: PropTypes.object,
    imageDefault: PropTypes.object
};
