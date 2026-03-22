/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from 'axios'

const useURLLoader = (url:string,deps:any[] = []) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then(result => {
      setData(result.data) //设置成请求的数据
      setLoading(false)
    })
  }, [url,...deps])
  return [data,loading]
}

export default useURLLoader