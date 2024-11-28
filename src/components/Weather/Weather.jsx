import styles from './Weather.module.scss'
import {Card} from "react-bootstrap";
import PositionSvg from "../Svgs/PositionSvg";
import DefaultWeather from "../Svgs/DefaultWeather";
import Thermometer from "../Svgs/Thermometer";
import Time from "../Svgs/Time";
import Wind from "../Svgs/Wind";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Moment from 'react-moment';

export const Weather = () => {
    const wheather = useSelector((state) => state.wheather)
    // useEffect(() => {
    //     console.log(wheather)
    // })
    return (
        <>
         <Card className={styles.container}>

            {
                wheather.isLoaded ? (
                    <Card.Body>
                    <Card.Title>
                         {wheather.name}{' '}{wheather.sys.country}
                        
                        <PositionSvg color={'rgba(255,255,255,0.7)'}/>
                        <div className={styles.date}>
                            <div>
                                <Moment format='llll' />
                            </div>
                            <div><Time width={'15px'} height={'15px'}/></div>
                        </div>
                    </Card.Title>
                    <Card.Text as={'div'} className={styles.weather_infos}>
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${wheather.weather.icon}@2x.png`} alt="" />
                        </div>
                        <div className={styles.temperature}>
                            <div>
                                
                            </div>
                            <div>
                                <Thermometer/>
                            </div>
                        </div>
                        <div>
                            Good Morning {wheather.sys.country}
                            <div className={styles.separator}></div>
                        </div>
                        <div className={styles.infos}>
                            <div className={styles.border_right}>
                                <div><DefaultWeather color={'#fff'}/></div>
                                <div>Sunrise</div>
                                <div>
                                    <Moment format='hh:mm'>
                                        {wheather.sys.sunrise}
                                    </Moment>
                                </div>
                            </div>
                            <div className={styles.border_right}>
                                <div><Wind/></div>
                                <div>Wind</div>
                                <div>{wheather.wind.speed}</div>
                            </div>
                            <div>
                                <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
                                <div>Temp</div>
                                <div>{wheather.main.temp}</div>
                            </div>
                        </div>

                    </Card.Text>
                </Card.Body>
                ) : (<Card.Body>
                    <Card.Title>
                        Please choise your city
                    </Card.Title>
                </Card.Body>)
            }
            </Card>
        </>
    )
}