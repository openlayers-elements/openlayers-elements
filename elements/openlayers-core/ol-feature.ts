import type Feature from 'ol/Feature.js'
import { LitElement } from 'lit'
import { ContextConsumer } from '@lit/context'
import { forwardEvents } from './lib/events.js'
import { map, vectorSource } from './lib/context.js'

/**
 * Base class for feature elements which attach themselves to vector layers
 *
 * @appliesMixin AttachableMixin
 */
export default abstract class OlFeature extends LitElement {
  protected readonly map: ContextConsumer<typeof map, typeof this>
  protected readonly vectorSource: ContextConsumer<typeof vectorSource, typeof this>
  private _feature?: Feature

  protected get _forwardedEvents(): string[] {
    return []
  }

  constructor() {
    super()
    this.vectorSource = new ContextConsumer(this, {
      context: vectorSource,
      callback: this._attach.bind(this),
      subscribe: true,
    })
    this.map = new ContextConsumer(this, {
      context: map,
      callback: this._attach.bind(this),
      subscribe: true,
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this._feature) {
      this.vectorSource.value?.removeFeature(this._feature)
    }
  }

  public abstract createFeature(): Feature

  private async _attach() {
    const map = this.map.value
    const source = this.vectorSource.value

    if (source && map) {
      this._feature = this.createFeature()
      source.addFeature(this._feature)
      forwardEvents(this._forwardedEvents, this, this._feature)
    }
  }
}
