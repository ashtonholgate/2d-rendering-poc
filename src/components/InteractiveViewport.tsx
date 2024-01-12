import { PixiComponent, useApp } from '@pixi/react'
import { Viewport as PixiViewport } from 'pixi-viewport'
import * as PIXI from 'pixi.js'
import { ReactNode } from 'react'

export interface ViewportProps {
	children?: ReactNode
}

export interface PixiComponentViewportProps extends ViewportProps {
	app: PIXI.Application
}

const PixiViewportComponent = PixiComponent('Viewport', {
	create: ({ app }: PixiComponentViewportProps) => {
		const events = new PIXI.EventSystem(app.renderer)
		events.domElement = app.renderer.view as any;

		const viewport = new PixiViewport({
			events: events,
			ticker: app.ticker,
			allowPreserveDragOutside: true,
			passiveWheel: false,
		})

		viewport
			.drag({
				clampWheel: false,
			})
			.wheel({
				percent: 0.1,
				trackpadPinch: true,
				axis: 'all',
				wheelZoom: true
			})
			.decelerate()
			.clampZoom({
				minScale: 0.25,
				maxScale: 5,
			})

		viewport.on('wheel', e => {
			console.log(e)
		})
		viewport.on('click', e => {
			console.log(e)
		})

		return viewport
	},
	willUnmount: (viewport: PixiViewport) => {
		// @ts-ignore Hack to get around pixi-viewport bug when destroying
		viewport.options.noTicker = true
		viewport.destroy({ children: true, texture: true, baseTexture: true })
	},
})

const Viewport = (props: any) => <PixiViewportComponent app={useApp()} {...props} />

export default Viewport
