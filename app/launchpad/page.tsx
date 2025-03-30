"use client"
import React, { useState, useRef, useEffect } from "react"
import { redirect } from 'next/navigation'

export default function Home() {
    // Redirect to /home
    redirect('/launchpad/home')
}
