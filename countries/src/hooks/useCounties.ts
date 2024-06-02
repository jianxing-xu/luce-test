import { useRef, useState } from "react"


type IUser = {
	name: {
		title: string,
		first: string,
		last: string
	},
	gender: 'male' | 'female' | 'all',
	location: {
		country: string,
		state: string,
		street: { number: number, name: string}
		city: string
	},
	registered: {date: string , age: number}
}


export function useCountries() {
	const mountRef = useRef<Boolean>(false)
	const sortedUsers = useRef<IUser[]>([])

	const [countries, setCountries] = useState<string[]>([]);
	const [mapUser, setMapUser] = useState<Record<string, IUser[]>>({});


	function processContries(users: IUser[], gender = 'all') {
		const map = users.reduce((pre, it) => {
			pre[it.location.country] = pre[it.location.country] || []
			pre[it.location.country].push(it)
			return pre;
		}, {} as Record<string, IUser[]>)
		const countries = Object.keys(map).toSorted((a,b) => map[b]?.length - map[a]?.length)

		setCountries(countries)
		setMapUser(map)
	}

	function onFilter(gender = 'all') {
		const filterUsers = sortedUsers.current.filter(it => gender === 'all' ? true : it.gender === gender)
		processContries(filterUsers)
	}

	function loadData() {
		fetch('https://randomuser.me/api/?results=100').then(res => res.json()).then((res: { results: IUser[] }) => {
			sortedUsers.current = res.results.toSorted((a,b) => Date.parse(b.registered.date) - Date.parse(a.registered.date))
			processContries(sortedUsers.current)
		})
	}
	if(!mountRef.current) {
		loadData()
		mountRef.current = true
	}

	return { countries, mapUser, onFilter }

}


export function useToggle() {
	const [sets, setSets] = useState<Record<string, any>>({})
	function toggle(value: any) {
		if(sets[value]) {
			setSets({[value]: false})
		}else {
			setSets({[value]: true})
		}
	}
	return { sets, toggle }
}
