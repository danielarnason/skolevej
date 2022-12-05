import React, { FC } from 'react';

const toPrettyNumber = (numValue) => {
    return new Intl.NumberFormat().format(numValue);
};
const distance = (actually, requirements)=> {
    const act10 = Math.round(actually/10);
    const act100 = Math.round(actually/100);
    const req10 = Math.round(requirements/10);
    const req100 = Math.round(requirements/100);
    if(act10===req10){
        return toPrettyNumber(actually / 1000);
    } else if (act100===req100){
        return toPrettyNumber(act10 / 100);
    } else {
        return toPrettyNumber(act100 / 10);
    }
};       
interface SpsrouteProps {
    travelDistanceInMeter: number;
    instructions: string[];
    distance: number;
    endAddress: string;
    schoolName: string;
    schoolAddress: string;
    grade: string;
}

const Spsroute: FC = (props: SpsrouteProps) => {

    const entitled =
        props.travelDistanceInMeter > props.distance
            ? 'message is-success'
            : 'message is-danger';
    const header =
        props.travelDistanceInMeter > props.distance
            ? 'Berettiget til tilskud'
            : 'Ikke berettiget til tilskud';

    // const instructions = props.instructions;
    // console.log(instructions)
    // const travelGuide: Element[] = [];
    // for (const instruction of instructions) {
    //     travelGuide.push(
    //         <p className="panel-block">
    //             {/* <span className="panel-icon">
    //         <i
    //             className="fas fa-book"
    //             aria-hidden="true"
    //         ></i>
    //     </span> */}
    //             {instruction}
    //         </p>
    //     );
    // }
    const travelDistanceInMeter = distance(props.travelDistanceInMeter, props.distance)
    return (
        <>
            <article className={entitled}>
                <div className="message-header">
                    <p>{header}</p>
                </div>
                <div className="message-body">
                    <div className="content">
                        <dl>
                            <dt>Fra adresse:</dt>
                            <dd>{props.schoolName}</dd>
                            <dd>{props.schoolAddress}</dd>
                            <dt>Til adresse:</dt>
                            <dd>{props.endAddress}</dd>
                            <dt>Afstand:</dt>
                            <dd>
                                {travelDistanceInMeter} km
                            </dd>
                        </dl>
                        <em>
                            På klassetrin ({props.grade}) udstedes der buskort til
                            alle elever, der har længere skolevej end {toPrettyNumber(props.distance / 1000
                                )} km
                        </em>
                    </div>
                </div>
            </article>
            {/* <div className="content">
                <nav className="panel">
                    <p className="panel-heading">Rutebeskrivelse</p>
                    {travelGuide}
                </nav>
            </div> */}
        </>
    );
};

export default Spsroute;
