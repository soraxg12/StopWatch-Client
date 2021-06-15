import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { api } from "../../services/api";

//interface dos  items
interface ITimes {
    _id: string;
    time: number;
    minutes: number;
    seconds: number;
    createdAt: string;
}

interface Iprops {
    isActive: boolean;
}

export function TimesHistory({ isActive }: Iprops) {
    const [times, setTimes] = useState<ITimes[]>([]);
    const [minitesaverage, setMinutesAverage] = useState<number>(0);
    const [secondsaverage, setSecondsAverage] = useState<number>(0);

    //calcula a media dos tempos
    function TimeMedium() {
        let minutesAverage = 0;
        let secondsAverage = 0;
        times.map(time => {
            minutesAverage += time.minutes;
            secondsAverage += time.seconds;
        })
        setMinutesAverage(minutesAverage / times.length);
        setSecondsAverage(secondsAverage / times.length);
    }

    //faz uma chamada para o back-end pra deletar os items
    async function RemoveTime(_id: string) {
        const TimesData = await api.delete(`/delete-one/${_id}`);
    }
    //pega todos os items
    async function GetAllTimes() {
        const TimesData = await api.get("/get-all");
        setTimes(TimesData.data);
    }
    //useefect que é atualizado quando se atualiza isactive,RemoveTime
    useEffect(() => {
        GetAllTimes();
        TimeMedium();
    }, [isActive, RemoveTime]);

    return (
        <ListGroup>
            <ListGroup.Item variant="warning"><FontAwesomeIcon icon={faClock} />   Average Time: {minitesaverage} minutes and {secondsaverage}</ListGroup.Item>
            {times.map(time => {
                return (
                    <ListGroup.Item key={time._id} variant="dark">Times: {time.minutes} minutes and {time.seconds} seconds  <Button variant="danger" onClick={() => RemoveTime(time._id)}><FontAwesomeIcon icon={faTrashAlt} /></Button ></ListGroup.Item>
                );
            })
            }
        </ListGroup>
    );
}