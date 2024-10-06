import _ from 'lodash'
import { useEffect } from 'react'

const useLocalStorageEffect = (callback, deps = []) => {
	if (!_.isFunction(callback)) {
		throw new Error('Callback in useLocalStorageEffect is not a function')
	}

	if (!_.isArray(deps)) {
		throw new Error('Depends in useLocalStorageEffect is not a Array')
	}

	const storageListener = (event) => {
		if (_.size(deps) > 0 && deps.includes(_.get(event, 'key'))) {
			return callback(
				_.get(event, 'key', ''),
				JSON.parse(_.get(event, 'newValue', '')),
				JSON.parse(_.get(event, 'oldValue', ''))
			)
		}

		if (_.isArray(deps) && _.size(deps) === 0) {
			return callback(
				_.get(event, 'key', ''),
				JSON.parse(_.get(event, 'newValue', '')),
				JSON.parse(_.get(event, 'oldValue', ''))
			)
		}
	}

	useEffect(() => {
		window.addEventListener('storage', storageListener, false)

		return () => window.removeEventListener('storage', storageListener)
	}, [])
}

export default useLocalStorageEffect