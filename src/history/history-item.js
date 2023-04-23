const HistoryItem = (item) => {
  const time = new Date(item.item.createdAt);
  return (
    <>
      <div className="row">
        <div className="col-2 bg-primary text-white m-1 rounded-end rounded-pill">
          {time.getFullYear()}-{time.getMonth()}-{time.getDate()}&nbsp;{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </div>
        <div className="col-9 fw-bold m-1">
          {item.item.text}
        </div>
      </div>
    </>
  )
}

export default HistoryItem;