export default (function () {
  return {
    createTemplateMinutesArray () {
      const arr = Array.from({ length: 12 }, (v, k) => k * 5)
      arr.push(arr.shift())
      return arr.map(item => ({ disabled: false, point: item }))
    },
    createTemplateHoursArray () {
      const arr = Array.from({ length: 12 }, (v, k) => k + 1)
      return arr.map(item => ({ disabled: false, point: item }))
    },
    isHourDisabled (hour, hours) {
      return !!hours.find(h => h.point === hour && h.disabled)
    },
    isMinuteDisabled (minute, minutes) {
      return !!minutes.find(m => m.point === minute && m.disabled)
    },
    handlePMChanges (isPm, hours) {
      return isPm
        ? hours === 0
          ? 12
          : hours
        : hours === 12
          ? 0
          : hours
    },
    createReal60MinutesArray () {
      const arr = Array.from({ length: 60 }, (v, k) => k)
      arr.push(arr.shift())
      return arr.map(item => ({ disabled: false, point: item }))
    },
    createDisabledTimesArray ({ forHours = false, isPm = false, year, month, day, hours = null, disabledDatesAndTimes = [], timePoints = [] }) {
      let times = [...timePoints]
      const reducer = (acc, val) => {
        let obj = { ...val }
        let hour, date
        if (forHours) {
          hour = isPm ? (val.point + 12 === 24 ? 12 : val.point + 12) : (val.point + 12 === 12 ? 0 : val.point)
          date = new Date(year, month, day, hour)
        } else {
          hour = isPm ? (hours + 12 === 24 ? 12 : hours + 12) : (hours + 12 === 12 ? 0 : hours)
          const { point } = val
          date = new Date(year, month, day, hour, point)
        }
        const disabledTimeEntries = Array.isArray(disabledDatesAndTimes) ? disabledDatesAndTimes : [disabledDatesAndTimes]
        obj = forHours ? this.compareHours(disabledTimeEntries, obj, date) : this.compareMinutes(disabledTimeEntries, obj, date)
        obj.disabled ? acc.push(obj) : acc
        return acc
      }
      return times.reduce(reducer, [])
    },
    compareHours (disabledTimeEntries, obj, date) {
      disabledTimeEntries.forEach(({ to = null, from = null }) => {
        const toJSDate = to && new Date(to)
        const fromJSDate = from && new Date(from)
        if (to && !from) {
          obj.disabled = (toJSDate.getDate() === date.getDate()) ? !(toJSDate.getHours() <= date.getHours() && date.getMinutes() - toJSDate.getMinutes() <= 5) : !(toJSDate.getTime() <= date.getTime())
        } else if (!to && from) {
          obj.disabled = !(date.getTime() <= fromJSDate.getTime())
        } else if (to && from) {
          obj.disabled =
            fromJSDate.getTime() <= date.getTime() &&
            date.getTime() <= toJSDate.getTime()
        } else {
          obj.disabled = false
        }
      })
      return obj
    },
    compareMinutes (disabledTimeEntries, obj, date) {
      disabledTimeEntries.forEach(({ to = null, from = null }) => {
        const toJSDate = to && new Date(to)
        const fromJSDate = from && new Date(from)
        if (to && !from) {
          obj.disabled = !(toJSDate.getTime() <= date.getTime())
        } else if (!to && from) {
          obj.disabled = !(date.getTime() <= fromJSDate.getTime())
        } else if (to && from) {
          obj.disabled =
            fromJSDate.getTime() <= date.getTime() &&
            date.getTime() <= toJSDate.getTime()
        } else {
          obj.disabled = false
        }
      })
      return obj
    },
    filterMinutesWithSteps ({ minutes, step, disabledMinutes }) {
      if (disabledMinutes && disabledMinutes.length > 0) {
        return minutes.map(m => m.point === disabledMinutes.find(d => d.point === m.point)
          ? disabledMinutes.find(d => d.point === m.point)
          : (m.point % step === 0 ? m : { point: m.point, disabled: true }))
      }
      return minutes.map(m => m.point % step === 0 ? m : { point: m.point, disabled: true })
    },
    handleDegreeChange (isHourMode, isPm, timePoints, degree) {
      if (isHourMode) {
        const hours = Math.round(degree / 30)
        if (isPm) {
          if (hours === 0) {
            return this.isHourDisabled(12, this.allHours) ? this.moveArrowToClosestPoint() : 12
          } else {
            return hours
          }
        } else {
          return hours === 12 ? 0 : hours
        }
      }
    },
    moveArrowToClosestPoint () {

    }
  }
})()

