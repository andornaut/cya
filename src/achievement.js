const _nextValue = (iterable) => iterable.next().value

const _normalizeDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())

function * _logTimeGenerator (logs) {
  for (const log of logs) {
    yield _normalizeDay(new Date(log)).getTime()
  }
}

function * _nextTimeGenerator (startDate) {
  let currentDate = _normalizeDay(startDate)
  while (true) {
    yield currentDate.getTime()
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1)
  }
}

const getDaysInARow = (achievement) => {
  const today = _normalizeDay(new Date())
  const generateLogTime = _logTimeGenerator(achievement.logs)
  const generateNextTime = _nextTimeGenerator(today)

  let count = 0
  let lastMatchedTime = null
  let logTime = _nextValue(generateLogTime)
  let nextTime = _nextValue(generateNextTime)
  while (true) {
    if (!logTime || !nextTime) {
      // One or both iterators have been exhausted
      break
    } else if (logTime === lastMatchedTime) {
      // Ignore duplicate logs entries
      logTime = _nextValue(generateLogTime)
    } else if (logTime === nextTime) {
      count++
      lastMatchedTime = logTime
      logTime = _nextValue(generateLogTime)
      nextTime = _nextValue(generateNextTime)
    } else if (nextTime === today.getTime()) {
      // Ignore missing logs for today
      nextTime = _nextValue(generateNextTime)
    } else {
      break
    }
  }
  return count
}

const getProgress = (achievement) => {
  if (achievement.goalType === 'NUMBER_OF_CLICKS') {
    return getNumberOfClicks(achievement)
  } else if (achievement.goalType === 'DAYS_IN_A_ROW') {
    return getDaysInARow(achievement)
  }
  throw new Error('Cannot get "current" for goalType: ' + achievement.goalType)
}

const getTarget = (achievement) => {
  if (achievement.goalType === 'NUMBER_OF_CLICKS') {
    return achievement.numberOfClicks
  } else if (achievement.goalType === 'DAYS_IN_A_ROW') {
    return achievement.daysInARow
  }
  throw new Error('Cannot get "target" for goalType: ' + achievement.goalType)
}

const getNumberOfClicks = (achievement) => achievement.logs.length

const isAchieved = (achievement) => achievement.goalType && getProgress(achievement) >= getTarget(achievement)

const isEmpty = (achievement) => getNumberOfClicks(achievement) === 0

export {
  getProgress,
  getDaysInARow,
  getNumberOfClicks,
  getTarget,
  isAchieved,
  isEmpty
}
