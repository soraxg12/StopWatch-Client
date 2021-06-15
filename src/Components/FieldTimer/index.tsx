import { Card } from "react-bootstrap";

//interface do field time
interface IFildTimer {
    value: string;
}
//component q resebe um value como prop
export const FieldTimer: React.FC<IFildTimer> = ({ value }: IFildTimer) => {
    return (
        <Card >
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <Card.Title style={{ fontSize: "14rem" }}>{value}</Card.Title>
                </blockquote>
            </Card.Body>
        </Card>
    );
}