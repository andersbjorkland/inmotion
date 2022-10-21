import React, { FC } from 'react';
// @ts-ignore
import Parser from 'fit-file-parser';
import { Record} from '../types/fitTypes';

const FitParser: FC = () => {
    const handleFile: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("Stuff is happening")
        const reader = new FileReader();
        reader.onload = async (e) => {
            console.log("Stuff is being loaded...")
            const content = (e?.target?.result);
            console.log(content);

            let fitParser = new Parser({
                force: true,
                speedUnit: 'km/h',
                lengthUnit: 'km',
                temperatureUnit: 'celsius',
                elapsedRecordField: true,
                mode: 'list'
            });

            let records: Record[] = [];
            fitParser.parse(content, function(error: any, data: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(data);
                }

                records = data.records
            });

            console.log(records);

        };

        let files = e?.target?.files
        if (files) {
            reader.readAsArrayBuffer(files[0]);
            console.log("Stuff is being read...")
        }
    }


    return (
        <>
            <h1>Hello Turner</h1>
            <input type="file" accept=".fit" onChange={(e) => handleFile(e)} />
        </>
    );
};

export default FitParser;
