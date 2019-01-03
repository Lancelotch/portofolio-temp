import React, { Component } from 'react';
import { Carousel, Row, Col } from 'antd';
import "sass/style.sass";
import serviceCategory from "api/services/ServiceCategory";

class SliderPrimary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsSlider: []
        };
    }

    componentWillMount() {
        this.sliderHome();
    }

    sliderHome = () => {
        serviceCategory
            .SliderHome()
            .then(response => {
                const productsSlider = response.data;
                this.setState({
                    productsSlider: productsSlider
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { productsSlider } = this.state;
        var items = [];
        const slides = productsSlider.map((productSlider, index) => {
            items.push({
                src: productSlider.imageUrl,
                // altTexts: 'Slide 1',
                // captions: 'Slide 1'
            });
            return (
                <a href={productSlider.url}>
                    <img src={productSlider.imageUrl} alt={productSlider.type} />
                    {/* <CarouselCaption captionText={productSlider.type} captionHeader={productSlider.type} /> */}
                </a>

            );
        });

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <Row>
                        <Col md={24}>
                            <Carousel autoplay>
                                {slides}
                            </Carousel>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default SliderPrimary;