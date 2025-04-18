'use client'


type Project = {
    name: string
    timeSpent: string
}

export function Project({ name, timeSpent } : Project) {
    return (
        <div>
            {name} - {timeSpent}
            
        </div>
    )
}