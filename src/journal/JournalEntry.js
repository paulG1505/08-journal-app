import React from 'react'
import moment from 'moment'
export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);

    return (
        <div className="journal__entry pointer">
            {   //si el url es diferente de undefined
                url &&
                <div className="journal__entry-picture"

                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                {/* momentjs para fechas */}
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('D')}</h4>
            </div>
        </div>
    )
}
