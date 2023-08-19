import { useEffect, useMemo, useRef } from 'react'
import { useScript } from 'usehooks-ts'


const AddressAutoComplete = ({ value, onChange, name = 'address' } : { value?: string, name: string, onChange: Function }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

    const scriptStatus = useScript(`https://maps.googleapis.com/maps/api/js?language=en&key=${apiKey}&libraries=places`)

    const autoCompleteRef = useRef<google.maps.places.Autocomplete>()
    const inputRef = useRef<HTMLInputElement>(null)

    const options = useMemo(
        () => ({
            fields: ["name"],
        }),
        []
    )

    useEffect(() => {
        // Conditions to ensure that no multiple instances of the
        // Google Places API class and event listener exist.
        if (
            autoCompleteRef.current ||
            scriptStatus === "loading" ||
            !inputRef.current ||
            !google ||
            !google.maps ||
            !google.maps.places
        ) {
            return
        }

        if (scriptStatus === "error") {
            // Report error
            return
        }

        autoCompleteRef.current = new google.maps.places.Autocomplete(
            inputRef.current,
            options
        )

        autoCompleteRef.current.addListener("place_changed", () => {
            if (!autoCompleteRef.current) {
                return
            }

            // Retrieve the selected location with the `getPlace` method.
            onChange(autoCompleteRef.current.getPlace().name)
        })
    }, [scriptStatus, options, onChange])

    return <input ref={inputRef} placeholder='' name={name} value={value} />
}

export default AddressAutoComplete