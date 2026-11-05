export default class HudScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HudScene', active: false });
  }

  create() {
    this.teks = this.add.text(4, 4, '', {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#ffffff'
    }).setScrollFactor(0).setDepth(10);

    this.perbaruiHud();
    this.registry.events.on('changedata', this.perbaruiHud, this);
    this.events.once('shutdown', this.lepasListener, this);
    this.events.once('destroy', this.lepasListener, this);
  }

  perbaruiHud() {
    const skor = this.registry.get('skor') ?? 0;
    const nyawa = this.registry.get('nyawa') ?? 0;
    this.teks.setText(`Skor ${skor}   Nyawa ${nyawa}`);
  }

  lepasListener() {
    this.registry.events.off('changedata', this.perbaruiHud, this);
  }
}
