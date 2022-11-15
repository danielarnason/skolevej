import React, { FC, useRef, useState } from 'react';
import Map from '../minimap/Minimap';
import Form from '../form/Form';
import Navbar from '../navbar/Navbar';
import { schoolsMinimapId } from '../../../config';
import Spsroute from '../spsroute/Spsroute';

export interface SkoleDataRow {
    id: string;
    skole: string;
    vejnavn: string;
    husnummer: string;
    postnummer: number;
    by: string;
    shape_wkt: { wkt: string };
}

const App: FC = () => {
    const minimap: any = useRef(null);
    const [skoleData, setSkoleData] = useState([]);
    const [result, setResult] = useState();

    const onMapReady = (mm) => {
        minimap.current = mm;
        const ses = mm.getSession();
        const ds = ses.getDatasource('lk_skoler_skoler');
        ds.execute({ command: 'read' }, (rows: SkoleDataRow[]) => {
            const data = rows.map((element) => {
                const wkt = element.shape_wkt.wkt;
                const start = wkt.search(/[0-9]/);
                const end = wkt.search(/[)]/);
                const subStr = wkt.substring(start, end);
                const latLong = subStr.replace(' ', ',');
                const adresse = `${element.vejnavn} ${element.husnummer}, ${element.postnummer} ${element.by}`;
                return {
                    id: parseInt(element.id as string),
                    skole: element.skole,
                    adresse,
                    latLong,
                };
            });
            setSkoleData(data);
        });
    };


    const spsRoute = async (
        schoolId: number,
        toCoord: string,
        distance: string,
        endAddress: string
    ) => {
        const school = skoleData.find((item) => item.id === schoolId);
        const url = `http://webgis-test.lolland.dk/spsroute/api/1.0/route?profile=skolerute&from=${school.latLong}&to=${toCoord}&srs=epsg:25832&lang=da`;
        const req = await fetch(url);
        const result = await req.json();
        const res = {
            ...result,
            distance: parseInt(distance),
            endAddress,
            schoolName: school.skole,
            schoolAddress: school.adresse,
        };
        setResult(res);
        minimap.current
          .getMapControl()
          .setMarkingGeometry(result.wkt, true, null, 100);

    };

    return (
        <>
            <section className="hero is-info is-small">
                <Navbar />
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 box">
                            <Form data={skoleData} onCalculate={spsRoute} />
                        </div>
                        <div className="column is-4">
                            {result && (
                                <Spsroute
                                    travelDistanceInMeter={
                                        result.travelDistanceInMeter
                                    }
                                    instructions={result.instructions}
                                    distance={result.distance}
                                    endAddress={result.endAddress}
                                    schoolName={result.schoolName}
                                    schoolAddress={result.schoolAddress}
                                />
                            )}

                            {!result && (
                                <article className="message is-light">
                                    <div className="message-body">
                                        <div className="content">
                                            <p>
                                                Få beregnet om en elev er
                                                berettiget til godtgørelse.
                                            </p>
                                            <ul>
                                                <li>
                                                    Vælg skole.
                                                </li>
                                                <li>
                                                    Indtast elevadressen skema.
                                                </li>
                                                <li>
                                                    Vælg klassetrin.
                                                </li>
                                                <li>
                                                    Klik på Beregn.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            )}
                        </div>
                        <Map
                            id={schoolsMinimapId}
                            name="movingpatterns"
                            size="is-4"
                            onReady={onMapReady}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default App;
